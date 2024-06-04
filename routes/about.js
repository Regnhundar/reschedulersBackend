import { Router } from 'express';
import { getAbout } from '../controllers/aboutController.js'

const router = Router();

// http://localhost:1337/about
router.get('/', getAbout);

export default router;