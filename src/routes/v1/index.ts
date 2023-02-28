import express from 'express';
import orderRoutes from './order';

const router = express.Router();

router.use('/', orderRoutes);

export default router;