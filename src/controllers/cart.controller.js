import Product from '../models/product.model.js';
import { stockAvailable } from '../helper/stockAvailable.helper.js';
import Cart from '../models/cart.model.js';
import Stock from '../models/stock.model.js';
import { verifyProductExist } from '../helper/productExist.helper.js';


export const insertProductCartController = async(req) =>{
    try{ 

        const clientID = req.user.idUser; 
        const quantityCart = req.body.quantityCart;
        const productID = req.params.id;

        // Validate if the product exists
        const productData = await Product.productExist(productID)
        const verifyProduct = verify(productData, productID);
        if(!verifyProduct){
            return verifyProduct
        }

        // Check if the product has stock available
        const stock = await Stock.getStockAvailable(productID)
        const verifyStock = await stockAvailable(quantityCart, stock)
        if (!stock.available) {
            return verifyStock
        }
        // Add the product to the cart
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

export const getMyCartController = async(req)=>{
    try{
        const clientID = req.user.idUser; 
        const getMyCart = await Cart.getProductCart(clientID);
        return{
            success: true,
            data: getMyCart
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

        // Validate if the product exists
        const productData = await Product.productExist(cartID);
        const verifyProduct = verify(productData, cartID);
        if(!verifyProduct){
            return verifyProduct
        }
        // Validate if the stock is available
        const stock = await Stock.getStockAvailable(productID)
        const verifyStock = await stockAvailable(quantityCart, stock)
        if (!stock.available) {
            return verifyStock
        }

        //Edit for quantity product cart
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

        // Validate if the product exists
        const productData = await Product.productExist(cartID);
        const verifyProduct = verifyProductExist(productData, cartID);
         if(!verifyProduct){
            return verifyProduct
        }
        //Delete product cart
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
