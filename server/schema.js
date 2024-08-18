import { varchar,pgTable, serial, text, timestamp,integer } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user_table', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
});


export const messageTable = pgTable('message', {
    id: serial('id').primaryKey(), // Optional auto-incrementing primary key
    conversationId: integer("conversationId").notNull(),
    senderId:integer("senderId").notNull(),
    receiverId:integer("receiverId").notNull(),
    message: text("message"), // Text type for message
    fileUrl: varchar('fileUrl'), // URL for Cloudinary file (image or video)
    fileType: varchar('fileType'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


export const conversationTable = pgTable('conversation', {
    id: serial('id').primaryKey(), // Optional auto-incrementing primary key
    
    members: varchar('members', { length: 255 }).array().notNull(),
    message: text('message'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
