import { Router } from 'express';
import { getMenu } from '../controllers/menuController.js'


export const router = Router();


router.get('/', getMenu);


