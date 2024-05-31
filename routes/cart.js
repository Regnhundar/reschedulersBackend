import { Router } from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js"

const router = Router()

router.get('/', getCart);
router.post('/:id', addToCart);
router.delete('/:id', removeFromCart);

export default router;