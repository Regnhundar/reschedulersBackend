import { Router } from "express";
import userSchema from "../models/userSchema.js";
import joiHandler from "../middleware/joiHandler.js";
import { registerUser, logoutUser, loginUser } from "../controllers/authController.js";

const router = Router();

// http://localhost:1337/auth/register
router.post("/register", joiHandler(userSchema), registerUser);

// http://localhost:1337/auth/login
router.post("/login", loginUser);

// http://localhost:1337/auth/logout
router.post("/logout", logoutUser);

export default router;