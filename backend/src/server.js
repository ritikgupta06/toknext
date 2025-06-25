import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouths from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/auth/", authRouths);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
