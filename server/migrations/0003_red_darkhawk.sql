ALTER TABLE "message" ADD COLUMN "message" text NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "userId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "conversationId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_userId_user_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_conversationId_conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."conversation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "message" DROP COLUMN IF EXISTS "conversation_id";--> statement-breakpoint
ALTER TABLE "message" DROP COLUMN IF EXISTS "sender_id";--> statement-breakpoint
ALTER TABLE "message" DROP COLUMN IF EXISTS "receiver_id";--> statement-breakpoint
ALTER TABLE "message" DROP COLUMN IF EXISTS "text";--> statement-breakpoint
ALTER TABLE "message" DROP COLUMN IF EXISTS "type";