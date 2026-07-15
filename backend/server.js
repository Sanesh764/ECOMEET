

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
import cookieParser from "cookie-parser";
import dns from "dns";
import logger from "./config/logger.js";
import connectDB from "./db/dbConnection.js";
import userRouter from "./routes/users.routes.js"

const app=express();
const server=createServer(app);
const io=connectToSocket(server);


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);
const port=process.env.PORT || 8000;
app.set("port",(port));
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb"}));

await connectDB();

app.use("/api/v1/user", userRouter);

const start=async()=>{
    server.listen(app.get("port"),()=>{
        logger.info(`Server is running on http://localhost:${port}`);
        
    })
};
start();