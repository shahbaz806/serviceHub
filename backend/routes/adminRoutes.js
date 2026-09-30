import { Router } from 'express'; import { dashboard, listUsers, updateUserRole } from '../controllers/adminController.js'; import { adminOnly, protect } from '../middleware/auth.js';
const router = Router();
router.use(protect, adminOnly);
router.get('/dashboard', dashboard);
router.get('/users', listUsers);
router.patch('/users/:id/role', updateUserRole);
export default router;
