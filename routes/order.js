import { Router } from 'express';
import { createOrder, getUserOrders, getOrderStatus } from '../controllers/orderController.js'

const router = Router();

// http://localhost:1337/orders
router.post('/', createOrder);

// http://localhost:1337/orders/user
router.post('/user', getUserOrders)

// http://localhost:1337/orders/status
router.get('/status', getOrderStatus)


export default router;