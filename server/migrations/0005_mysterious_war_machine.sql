ALTER TABLE "message" ALTER COLUMN "message" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "fileUrl" varchar;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "fileType" varchar;--> statement-breakpoint
ALTER TABLE "message" DROP COLUMN IF EXISTS "type";