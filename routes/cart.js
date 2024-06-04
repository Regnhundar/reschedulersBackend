import { Router } from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js"

const router = Router()

// http://localhost:1337/cart
router.get('/', getCart);

// http://localhost:1337/cart/1
router.post('/:id', addToCart);

// http://localhost:1337/cart/1
router.delete('/:id', removeFromCart);

export default router;