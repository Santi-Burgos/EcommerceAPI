import Offert from '../models/offert.model.js';
import Product from '../models/product.model.js'

export const createOffertController = async(req) =>{
    try{
        const {offertPrice, discountPrice, startDate, expirationDate, productID } = req.body;

        if(!offertPrice){
            //Validation campo null
        }else{
        }

        // validar startDate availible

        const createOffert = await Offert.createOffert(offertPrice, discountPrice, startDate, expirationDate, productID)
        return{
            success: true,
            data: createOffert
        }
    }catch(err){
        return{
            success: false,
            error:{
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
        }
    }
}
//cuando expira la offert cuando vence el tiempo
export const expirationOffertController = async(req) =>{
    try{
    }catch(err){
        return{
        }
    }
}

//cuando elimino la offert, cuando se selecciona manualmente
export const deleteOffertController = async(req)=>{
    try{
        const offertID = req.param;
        const deleteOffert = await Offert.deleteOffert(offertID)
        return{
            success: true,
            data: deleteOffert
        }
    }catch(err){
        return{
            success: false,
            error:{
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
        }
    }
}
