import { Router } from "express";
import { getPromotions } from '../controllers/promotionController.js'

const router = Router();

// http://localhost:1337/promotions
router.get("/", getPromotions);

export default router;