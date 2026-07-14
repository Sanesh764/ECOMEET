
require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dns=require("dns");

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);
const port=process.env.PORT;

(async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("database connection successfully");
    }catch(err){
        console.log("server error");  
    }
}
)();

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})