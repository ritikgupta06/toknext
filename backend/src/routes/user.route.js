import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMyFriends,
  getRecommandedUsers,
} from "../controllers/user.controller.js";

const router = express.Router();
//implementing protect route for all user routes

router.use(protectRoute);
router.get("/", getRecommandedUsers);
router.get("/", getMyFriends);

export default router;
