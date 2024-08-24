import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {userTable} from "../schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';
import dotenv from "dotenv"
import { eq } from "drizzle-orm";

dotenv.config({
    path: './.env'
})

const connectionString = process.env.DRIZZLE_DATABASE_URL;
   
neonConfig.fetchConnectionCache = true;
  
const sql = neon(connectionString);

const db = drizzle(sql);

export const saveUser = asyncHandler(async(req,res) => {
    const { username } = req.body

    // Check if user already exists
    const existingUser = await db.select()
        .from(userTable)
        .where(eq(userTable.username, username))
        .limit(1);

    if (existingUser.length > 0) {
        return res.status(400).json(
            new ApiResponse(400, null, "Username already exists")
        )
    }

    // If user doesn't exist, proceed with insertion
    const user = await db.insert(userTable).values({ username }).returning();

    if (!user) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, user, "User Data Saved Successfully")
    )
})

export const getUser = asyncHandler(async(req,res) => {

     const users = await db
                        .select().from(userTable)

     if (!users) {
        throw new ApiError(500, "Something went wrong while getting the user")
    }

    return res.status(201).json(
        new ApiResponse(200, users, "User fetched Successfully")
    )
})