CREATE TABLE "short_links" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "short_links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"short_code" varchar(16) NOT NULL UNIQUE,
	"destination" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
