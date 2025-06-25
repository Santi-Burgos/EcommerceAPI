import { mapUploadedImages } from '../helper/imageArray.helper.js';
import Product from '../models/product.model.js';
import { validateProductData } from '../validations/product.validations.js';

export const createProductController = async(req)=>{
    try{

        const images = await mapUploadedImages(req.files);
        const validationProduct = validateProductData(req.body);

        console.log(req.body)

        if(!validationProduct.success){
            return{
                success: false,
                error:{
                    name: 'ZodError',
                    issues: validationProduct.error.issues,
                }
            }
        }


        const createProduct = await Product.createProduct(validationProduct.data, images)
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