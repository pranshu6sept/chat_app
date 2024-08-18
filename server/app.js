import express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import route from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js"
import conversationRoute from "./routes/conversation.route.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

app.use('/',route,messageRoute,conversationRoute)

export { app }