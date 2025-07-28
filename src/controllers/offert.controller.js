import Offert from '../models/offert.model.js';

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

export const deleteOffertController = async(req)=>{
    try{
        
    }catch{

    }
}
