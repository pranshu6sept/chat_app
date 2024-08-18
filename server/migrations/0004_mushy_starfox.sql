ALTER TABLE "message" DROP CONSTRAINT "message_userId_user_table_id_fk";
--> statement-breakpoint
ALTER TABLE "message" DROP CONSTRAINT "message_conversationId_conversation_id_fk";
--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "senderId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "receiverId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "type" text;--> statement-breakpoint
ALTER TABLE "message" DROP COLUMN IF EXISTS "userId";