import { Router } from 'express';
import { profile, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.get('/profile', protect, profile);
router.patch('/profile', protect, updateProfile);
export default router;
