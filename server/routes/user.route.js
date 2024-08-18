import express from "express";
import { getUser, saveUser } from "../controllers/user.controller.js";
import {upload} from "../multer.js"

const route = express.Router();

route.post('/saveuser',
upload.fields([
    {
        name: "fileUrl",
        maxCount: 1
    }, 
]),saveUser)
route.get('/getuser',getUser)

export default route