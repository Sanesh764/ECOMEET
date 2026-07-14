
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {createServer} from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import connectToSocket from "./controllers/socketManager.js";
import cors from "cors";
import dns from "dns";

const app=express();
const server=createServer(app);
const io=connectToSocket(server);


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);


app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}))

(async()=>{
    try{
        const connectioDb=await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log(`MONGODB connected DB host :${connectioDb.connection.host}`);
    }catch(err){
        console.log("server error",err);  
    }
}
)();

app.get("/home",async(req,res)=>{
    res.send("this is homepage");
})

const start=async()=>{
    server.listen(app.get("port"),()=>{
        console.log(`listening on port ${port}`);
        
    })
};
start();