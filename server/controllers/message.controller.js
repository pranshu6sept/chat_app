import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { conversationTable, messageTable } from "../schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

dotenv.config({
  path: "./.env",
});

const connectionString = process.env.DRIZZLE_DATABASE_URL;

neonConfig.fetchConnectionCache = true;

const sql = neon(connectionString);

const db = drizzle(sql);

export const newMessage = asyncHandler(async (req, res) => {
  const { message, senderId, receiverId, conversationId } = req.body;
  let fileUrl, fileType;

  // Check if the conversation exists
  const conversation = await db
    .select()
    .from(conversationTable)
    .where(eq(conversationTable.id, conversationId));

  if (!conversation) {
    return res.status(400).json({ error: "Conversation does not exist" });
  }

  if (req.file) {
    try {
      const result = await uploadOnCloudinary(req.file.path, {
        resource_type: "auto", // Automatically detect if it's an image or video
      });
      fileUrl = result.secure_url;
      fileType = result.resource_type; // 'image' or 'video'
    } catch (error) {
      throw new ApiError(500, "Error uploading file to Cloudinary");
    }
  }

  const messagetext = await db
    .insert(messageTable)
    .values({
      message,
      senderId,
      receiverId,
      conversationId,
      fileUrl,
      fileType,
    })
    .returning();

  await db
    .update(conversationTable)
    .set({ message: message })
    .where(eq(conversationTable.id, conversationId));

  if (!messagetext) {
    throw new ApiError(500, "Something went wrong while sending the message");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, messagetext, "message sent successfully"));
});

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await db
    .select()
    .from(messageTable)
    .where(eq(messageTable.conversationId, req.params.id));

  if (!messages || messages.length === 0) {
    throw new ApiError(404, "No messages found for this conversation");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, messages, "messages fetched Successfully"));
});
