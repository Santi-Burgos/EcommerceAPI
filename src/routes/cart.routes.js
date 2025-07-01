import express from 'express';
import { insertProductCartController } from '../controllers/cart.controller.js';
import { authToken } from '../middlewares/auth.middleware.js';
import { pushToCartView } from '../views/cart.views.js';



const cartRoutes = express.Router();


cartRoutes.post('/push-to-cart/:id', authToken, async(req, res, next)=>{
    const result = await insertProductCartController(req)
    pushToCartView(result, res)
})

export default cartRoutes;