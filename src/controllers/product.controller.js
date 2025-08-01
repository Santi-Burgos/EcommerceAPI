import { deleteImageSelect } from '../helper/deleteImagesDeleted.helper.js';
import { mapUploadedImages } from '../helper/imageArray.helper.js';
import Product from '../models/product.model.js';
import { validateProductData } from '../validations/product.validations.js';

export const createProductController = async(req)=>{
    try{
        const images = await mapUploadedImages(req.files);
        const validationProduct = validateProductData(req.body);

        if(!validationProduct.success){
            return{
                success: false,
                error:{
                    name: 'ZodError',
                    issues: validationProduct.error.issues,
                }
            }
        }
        const productData = {
        ...validationProduct.data,
            images,
        };

        const createProduct = await Product.createProductModel(productData)
        return{
            success: true,
            data: createProduct
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

export const getProductController = async()=>{
    try{
        const getListProduct = await Product.getListProductModel();
        return{
           success: true,
            data: getListProduct
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



export const deleteProductController = async (req) =>{
    try{
        const productID = req.params.id;

        const deleteImg = await deleteImageSelect('imageProduct', 'urlImgProduct', productID, 'idProduct')

        if(deleteImg.success){
            console.log('Se han elimnado las imagenes con exito')    
        }

        const deleteProduct = await Product.deleteProductModel(productID);
        return{
            success: true,
            data: deleteProduct
        }
    }catch(err){
        return{
            sucess: false,
            error:{
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
        }
    }
}