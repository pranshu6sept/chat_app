import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {conversationTable} from "../schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';
import dotenv from "dotenv"
import { and,eq ,sql} from "drizzle-orm";

dotenv.config({
    path: './.env'
})

const connectionString = process.env.DRIZZLE_DATABASE_URL;
   
neonConfig.fetchConnectionCache = true;
  
const sql1 = neon(connectionString);

const db = drizzle(sql1);

export const newConversation = asyncHandler(async(req,res) =>{

    const {senderId,receiverId } = req.body

    const existingConversation = await db.select().from(conversationTable)
            .where(
                and(
                    sql`${senderId} = ANY(${conversationTable.members})`,
                    sql`${receiverId} = ANY(${conversationTable.members})`
                )
            )
            .limit(1); // We only need to check if one exists

        if (existingConversation.length > 0) {
            response.status(200).json('Conversation already exists');
            return;
        }


        const newConversation = await db.insert(conversationTable).values({
            members: [senderId, receiverId]
        }).returning();

        if (!newConversation) {
            throw new ApiError(500, "Something went wrong while creating conversation")
        }

        return res.status(201).json(
            new ApiResponse(200, newConversation, "conversation created successfully")
        )
})

export const getConversation = asyncHandler(async(req,res) => {

    const {senderId,receiverId } = req.body

    const existingConversation = await db.select().from(conversationTable)
            .where(
                and(
                    sql`${senderId} = ANY(${conversationTable.members})`,
                    sql`${receiverId} = ANY(${conversationTable.members})`
                )
            ).limit(1); // We only need to check if one exists
                        
    if (!existingConversation) {
        throw new ApiError(404, "conversation not found");
    }

    return res.status(201).json(
        new ApiResponse(200, existingConversation[0], "converstion fetched successfully")
    )
})