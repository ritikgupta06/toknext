import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import authRouths from "./routes/auth.route.js";
import userRouths from "./routes/user.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
app.use("/api/auth/", authRouths);
app.use("/api/users/", userRouths);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
