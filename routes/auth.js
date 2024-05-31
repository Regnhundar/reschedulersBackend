import { Router } from "express";
import userSchema from "../models/userSchema.js";
import joiHandler from "../middleware/joiHandler.js";
import { registerUser, getUserOrders, getOrderStatus, logoutUser, loginUser } from "../controllers/authController.js";

const router = Router();

router.post("/register", joiHandler(userSchema), registerUser);

//Se leveranstid på beställning - kollar först om användare är inloggad
router.get("/order", getOrderStatus);

router.post("/login", loginUser);

//Logout
router.post("/logout", logoutUser);

//getUserOrders
router.post("/user/orders", getUserOrders);

export default router;