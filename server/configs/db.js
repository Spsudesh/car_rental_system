// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const connectDB = async () => {
  try {
   const connect = await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected successfully");

  } 
  catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1); // Stop the app if DB fails
  }
};

export default connectDB;
