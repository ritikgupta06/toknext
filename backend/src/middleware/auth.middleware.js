import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
