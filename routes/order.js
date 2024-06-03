import { Router } from 'express';
import { createOrder, getUserOrders, getOrderStatus } from '../controllers/orderController.js'

const router = Router();

router.post('/', createOrder);
router.post('/user', getUserOrders)
router.get('/status', getOrderStatus)


export default router;