import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected successfully ${conn.connection.host}`);
  } catch (error) {
    console.log("error in connection", error);
    process.exit(1); //means something went wrong
  }
};
