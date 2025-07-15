import express from 'express';
import clientRoutes from './client.routes.js';
import adminRoutes from './admin.routes.js';
import productRoutes from './product.routes.js';
import cartRoutes from './cart.routes.js';
import paymentRoutes from './payment.routes.js';
import ticketRoutes from './ticket.routes.js';

const router = express.Router();

router.use('/client', clientRoutes);
router.use('/client/cart', cartRoutes)

router.use('/ticket', ticketRoutes);

router.use('/payment', paymentRoutes)


router.use('/admin', adminRoutes);
router.use('/admin/product', productRoutes)

export default router;
