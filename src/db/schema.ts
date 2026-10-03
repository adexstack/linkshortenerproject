import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const shortLinks = pgTable("short_links", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id").notNull(),
  shortCode: varchar("short_code", { length: 16 }).notNull().unique(),
  originalUrl: text("original_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});