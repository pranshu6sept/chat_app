ALTER TABLE "user_table" DROP CONSTRAINT "user_table_email_unique";--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_table" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "user_table" ADD CONSTRAINT "user_table_username_unique" UNIQUE("username");