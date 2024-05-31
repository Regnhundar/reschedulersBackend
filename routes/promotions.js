import { Router } from "express";
import { getPromotions } from '../controllers/promotionController.js'

const route = Router();

route.get("/", getPromotions);

export default route;