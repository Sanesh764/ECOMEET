import {asyncHandler} from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch(error) {
        console.error("Token generation failed:", error);
        throw new ApiError(500, "something went wrong while generating refresh and access tokens");
    }
};

const registerUser = asyncHandler(async(req,res)=>{
    const {name,username,password}=req.body;
    if(
        [name,username,password].some((field)=>
        !field || field.trim()==="")
    ){
        throw new ApiError(400, "All fields are required");
    }
    const existedUser=await User.findOne({ username: username.toLowerCase() })
    if(existedUser){
        throw new ApiError(409,"user with username already exists");
    }
    const user= await User.create({
        name,
        password,
        username:username.toLowerCase()
    })
    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user");
    }

    //send response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )
})


//login user
const loginUser=asyncHandler(async (req,res)=>{
    const {username,password}=req.body;

    if(!username){
        throw new ApiError(404,"Username is required")
    }
    const user = await User.findOne({ username: username.toLowerCase() })
    if(!user){
        throw new ApiError(404,"user don't exist");
    }
    const isPasswordValid= await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"invalid user credentials");
    }

    const {accessToken,refreshToken} =  await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,
                refreshToken
            },
            "user logged In successfull"
        )
    )
});

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{//yaha set bhi use kar sakte hai agar errpr aaye to
                refreshToken:1
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true 
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged Out successfully"))

})

const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken =req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401,"unauthorized request")
    }

    try {
        const decodedToken=jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )
    const user= await User.findById(decodedToken?._id)
    if(!user){
        throw new ApiError(401,"Invalid refresh token")
    }
    if(incomingRefreshToken !==user?.refreshToken){
        throw new ApiError(401,"Refresh token is expired or used")
    }

    const options={
        httpOnly:true,
        secure:true
    }
    const {accessToken, refreshToken: newRefreshToken}= await generateAccessAndRefereshTokens(user._id)

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
        new ApiResponse(
            200,
            {accessToken,refreshToken:newRefreshToken},
            "Access token refreshed"
        )
    )
    } catch(error) {
        throw new ApiError(401,error?.message || "invalid refresh token")
    }
})
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
};