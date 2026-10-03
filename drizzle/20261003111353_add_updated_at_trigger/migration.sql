-- Custom SQL migration file, put your code below! --
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER short_links_set_updated_at
BEFORE UPDATE ON "short_links"
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
