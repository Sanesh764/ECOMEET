

import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});
import express from "express";
import {createServer} from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import connectToSocket from "./controllers/socketManager.js";
import cors from "cors";
import dns from "dns";
import logger from "./config/logger.js";
import connectDB from "./db/dbConnection.js";

const app=express();
const server=createServer(app);
const io=connectToSocket(server);


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);
const port=process.env.PORT || 8000;
app.set("port",(port));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb"}));

// (async()=>{
//     try{
//         const connectioDb=await mongoose.connect('mongodb://127.0.0.1:27017/test');
//         logger.info(`MONGODB connected DB host :${connectioDb.connection.host}`);
//     }catch(err){
//         logger.error("Database Connection Failed"); 
//     }
// }
// )();
await connectDB();

app.get("/home",async(req,res)=>{
    res.send("this is homepage");
})

const start=async()=>{
    server.listen(app.get("port"),()=>{
        logger.info(`Server is running on http://localhost:${port}`);
        
    })
};
start();