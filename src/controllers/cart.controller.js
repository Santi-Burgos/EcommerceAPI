import { productExist } from '../helper/productExist.helper.js';
import { stockAvalible } from '../helper/stockAvailable.helper.js';
import Cart from '../models/cart.model.js';


export const insertProductCartController = async(req) =>{
    try{ 
        const clientID = req.user.idUser; 
        const quantityCart = req.body.quantityCart;
        const productID = req.params.id;

        const isProductAvailable = await productExist(productID)
        if(!isProductAvailable){
            return{
                data: isProductAvailable
            }
        }
        const theresStock = stockAvalible(quantityCart, productID);
        if(!theresStock){
            return{
                data: theresStock
            }
        }

        const addToCart = await Cart.createCart(quantityCart, productID, clientID)
        return{
            success: true,
            data: addToCart
        }
    }catch(err){
       return{
            success: false,
            error: {
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
        }
    }
}
export const editItemCartController = async(req)=>{
    try{
        const {quantityCart, cartID} = req.body;
        const clientID = req.user.idUser;

        const editItemCart = await Cart.editItemCart(quantityCart, cartID, clientID)
        return{
            success: true,
            data: editItemCart
        }

    }catch(error){
        return{
            success: false,
            error:{
                name: err.name || 'InternalError',
                message: err.message||'Unexpected error',
                stack: err.stack
            }
        }
    }
}
export const deleteProductCartController = async(req) =>{
    try{
        const cartID = req.params.id;
        const clientID = req.user.idUser;

        const deleteItemCart = await Cart.deleteProductCart(cartID, clientID);
        return{
            success: true,
            data: deleteItemCart
        }
    }catch(err){
        return{
            success: false,
            error:{
                name: err.name || 'InternalError',
                message: err.message||'Unexpected error',
                stack: err.stack
            }
        }
    }
}
