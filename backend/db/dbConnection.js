
import mongoose from "mongoose";
import { db_Name } from "../constants.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/${db_Name}`, {
            serverSelectionTimeoutMS: 9000, // 9 sec ke andar server nahi mila to fail
            connectTimeoutMS: 17000,        // socket-level connect timeout
        });
        console.log(`Mongodb connection successfully ${conn.connection.host}`);
    } catch (error) {
        console.log("connection failed", error);
        process.exit(1);
    }
};

export default connectDB;