import express from 'express';
import { deleteProductCartController, editItemCartController, getMyCartController, insertProductCartController } from '../controllers/cart.controller.js';
import { authToken } from '../middlewares/auth.middleware.js';
import { deleteItemCartView, pushToCartView, editItemCartView, getMyCartView } from '../views/cart.views.js';



const cartRoutes = express.Router();


cartRoutes.post('/push-to-cart/:id', authToken, async(req, res, next)=>{
    const result = await insertProductCartController(req)
    pushToCartView(result, res)
})

cartRoutes.put('/edit-item-cart/:id', authToken, async(req, res, next)=>{
    const result = await editItemCartController(req)
    editItemCartView(result, res)
})

cartRoutes.delete('/delete-item-cart/:id', authToken, async(req, res, next)=>{
    const result = await deleteProductCartController(req)
    deleteItemCartView(result, res)

})

cartRoutes.get('/get-my-cart', authToken, async(req, res, next)=>{
    const result = await getMyCartController(req)
    getMyCartView(result, res)
})

export default cartRoutes;