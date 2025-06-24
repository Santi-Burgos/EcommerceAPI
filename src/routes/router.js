import express from 'express';
import clientRoutes from './client.routes.js';
import adminRoutes from './admin.routes.js';

const router = express.Router();

router.use('/client', clientRoutes);
router.use('/admin', adminRoutes);

export default router;
