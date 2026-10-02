import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const shortLinks = pgTable("short_links", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  shortCode: varchar("short_code", { length: 16 }).notNull().unique(),
  destination: text("destination").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});