import express from "express";
import { getConversation, newConversation } from "../controllers/conversation.controller.js";



const conversationRoute = express.Router();

conversationRoute.post('/create-conversation',newConversation)
conversationRoute.get('/get-conversation/',getConversation)


export default conversationRoute