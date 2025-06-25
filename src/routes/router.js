import express from 'express';
import clientRoutes from './client.routes.js';
import adminRoutes from './admin.routes.js';
import productRoutes from './product.routes.js';

const router = express.Router();

router.use('/client', clientRoutes);
router.use('/admin', adminRoutes);
router.use('/product', productRoutes)

export default router;
