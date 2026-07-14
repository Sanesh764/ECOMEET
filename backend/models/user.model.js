
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    }

},{timestamps:true});

export const User=new mongoose.model("User",userSchema);