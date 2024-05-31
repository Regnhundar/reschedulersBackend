import { Router } from "express";
import { getPromotions } from '../controllers/promotionController.js'

const router = Router();

router.get("/", getPromotions);

export default router;