import { Router } from 'express';
import { getAbout } from '../controllers/aboutController.js'

const router = Router();

// GET about
router.get('/', getAbout);

export default router;