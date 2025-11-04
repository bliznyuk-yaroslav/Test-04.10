import { Router } from 'express';
import authRouter from './auth';
import tasksRouter from './tasks';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));

router.use('/auth', authRouter);
router.use('/tasks', authMiddleware, tasksRouter);

export default router;
