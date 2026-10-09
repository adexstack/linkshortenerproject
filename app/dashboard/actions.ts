"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createLink, deleteLink, SlugTakenError, updateLinkUrl } from "@/data/links";

const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .trim()
    .min(1, "URL is required")
    .url("Enter a valid URL"),
  customSlug: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z
      .string()
      .trim()
      .max(16, "Custom slug must be 16 characters or fewer")
      .regex(
        /^[A-Za-z0-9_-]+$/,
        "Only letters, numbers, hyphens, and underscores are allowed"
      )
      .optional()
  ),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

export type CreateLinkResult = { error: string } | { shortCode: string };

export async function createLinkAction(
  input: CreateLinkInput
): Promise<CreateLinkResult> {
  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in to create a link." };
  }

  try {
    const link = await createLink(
      userId,
      parsed.data.originalUrl,
      parsed.data.customSlug
    );
    revalidatePath("/dashboard");
    return { shortCode: link.shortCode };
  } catch (error) {
    if (error instanceof SlugTakenError) {
      return { error: "That custom slug is already taken." };
    }
    throw error;
  }
}

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  originalUrl: z
    .string()
    .trim()
    .min(1, "URL is required")
    .url("Enter a valid URL"),
  shortCode: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(16, "Slug must be 16 characters or fewer")
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Only letters, numbers, hyphens, and underscores are allowed"
    ),
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export type UpdateLinkResult = { error: string } | { success: true };

export async function updateLinkAction(
  input: UpdateLinkInput
): Promise<UpdateLinkResult> {
  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in to update a link." };
  }

  try {
    const link = await updateLinkUrl(
      userId,
      parsed.data.id,
      parsed.data.originalUrl,
      parsed.data.shortCode
    );
    if (!link) {
      return { error: "Link not found." };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    if (error instanceof SlugTakenError) {
      return { error: "That slug is already taken." };
    }
    throw error;
  }
}

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

export type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export type DeleteLinkResult = { error: string } | { success: true };

export async function deleteLinkAction(
  input: DeleteLinkInput
): Promise<DeleteLinkResult> {
  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in to delete a link." };
  }

  const link = await deleteLink(userId, parsed.data.id);
  if (!link) {
    return { error: "Link not found." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
