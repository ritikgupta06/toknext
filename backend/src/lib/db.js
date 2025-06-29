import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error("❌ MONGODB_URI environment variable is missing");
      console.error("   Please add MONGODB_URI to your .env file");
      console.error("   Example: MONGODB_URI=mongodb://localhost:27017/toknext");
      process.exit(1);
    }
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("   Please ensure MongoDB is running and the connection string is correct");
    process.exit(1);
  }
};
