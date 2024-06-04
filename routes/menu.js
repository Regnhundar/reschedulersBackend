import { Router } from 'express';
import { getMenu } from '../controllers/menuController.js'

const router = Router();

// http://localhost:1337/menu
router.get('/', getMenu);

export default router