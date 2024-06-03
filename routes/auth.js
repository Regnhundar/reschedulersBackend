import { Router } from "express";
import userSchema from "../models/userSchema.js";
import joiHandler from "../middleware/joiHandler.js";
import { registerUser, logoutUser, loginUser } from "../controllers/authController.js";

const router = Router();

router.post("/register", joiHandler(userSchema), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;