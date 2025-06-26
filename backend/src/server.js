import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("api/chats/", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
