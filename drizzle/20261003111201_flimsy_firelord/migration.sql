ALTER TABLE "short_links" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "short_links" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;