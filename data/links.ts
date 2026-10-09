import "server-only";

import { randomInt } from "node:crypto";

import { and, eq, desc } from "drizzle-orm";

import { db } from "@/src/db";
import { shortLinks } from "@/src/db/schema";

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.userId, userId))
    .orderBy(desc(shortLinks.createdAt));
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.shortCode, shortCode))
    .limit(1);
  return link;
}

export async function updateLinkUrl(
  userId: string,
  id: number,
  originalUrl: string,
  shortCode: string
) {
  try {
    const [link] = await db
      .update(shortLinks)
      .set({ originalUrl, shortCode, updatedAt: new Date() })
      .where(and(eq(shortLinks.id, id), eq(shortLinks.userId, userId)))
      .returning();
    return link;
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new SlugTakenError();
    }
    throw error;
  }
}

export async function deleteLink(userId: string, id: number) {
  const [link] = await db
    .delete(shortLinks)
    .where(and(eq(shortLinks.id, id), eq(shortLinks.userId, userId)))
    .returning();
  return link;
}

const SHORT_CODE_ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SHORT_CODE_LENGTH = 7;
const MAX_SHORT_CODE_ATTEMPTS = 5;

function generateShortCode(): string {
  let code = "";
  for (let i = 0; i < SHORT_CODE_LENGTH; i++) {
    code += SHORT_CODE_ALPHABET[randomInt(SHORT_CODE_ALPHABET.length)];
  }
  return code;
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "23505"
  );
}

export class SlugTakenError extends Error {
  constructor() {
    super("Custom slug is already taken");
    this.name = "SlugTakenError";
  }
}

export async function createLink(
  userId: string,
  originalUrl: string,
  customSlug?: string
) {
  if (customSlug) {
    try {
      const [link] = await db
        .insert(shortLinks)
        .values({ userId, originalUrl, shortCode: customSlug })
        .returning();
      return link;
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new SlugTakenError();
      }
      throw error;
    }
  }

  for (let attempt = 1; attempt <= MAX_SHORT_CODE_ATTEMPTS; attempt++) {
    try {
      const [link] = await db
        .insert(shortLinks)
        .values({ userId, originalUrl, shortCode: generateShortCode() })
        .returning();
      return link;
    } catch (error) {
      if (isUniqueViolation(error) && attempt < MAX_SHORT_CODE_ATTEMPTS) {
        continue;
      }
      throw error;
    }
  }
  throw new Error("Failed to generate a unique short code");
}
