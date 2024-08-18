import express from "express";
import { getMessages, newMessage } from "../controllers/message.controller.js";


const messageRoute = express.Router();

messageRoute.post('/send-message',newMessage)
messageRoute.get('/get-message/:id',getMessages)


export default messageRoute