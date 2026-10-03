ALTER TABLE "short_links" ADD COLUMN "original_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "short_links" DROP COLUMN "destination";