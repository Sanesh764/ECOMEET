
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String
    }

},{timestamps:true});

userSchema.pre("save", async function () {//yaha pr arrow function ka use mat karna bez arrow function ke pass this ka context nhi hota hai
    if (!this.isModified("password")) return;//jab password modify hua hai tb hi change karna h otherwise return kar do simple no need to change again
    this.password = await bcrypt.hash(this.password, 12);
});

//ye code compare karega user ne jo password enter kiya h or jo batabase me password encrypt hai kya dono same hai using bcrypt
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);//ye true or false me return karta hai 
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};
const User=mongoose.model("User",userSchema);
export {User};