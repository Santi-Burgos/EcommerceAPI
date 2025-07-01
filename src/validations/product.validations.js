import {z} from 'zod';

const productSchema = z.object({
    Sku: z.string({
        required_error: 'SKU is required'
    }),
    productName: z.string({
        required_error: 'product name is required',
        invalid_type_error: 'product name must be a string'
    }),
    productDescription: z.string({
        required_error: 'product description is required'
    }),
    productPrice: z.coerce.number({
        required_error: 'product price is required',
        invalid_type_error: 'product price must be a number' 
    }),
    idStatusProduct: z.coerce.number({
         required_error: 'idStatusProduct is required',
        invalid_type_error: 'idStatusProduct must be a number' 
    }),
    idBrand: z.coerce.number({
         required_error: 'idBrand is required',
        invalid_type_error: 'idBrand must be a number' 
    }),
    idCategory: z.coerce.number({
         required_error: 'idCategory is required',
        invalid_type_error: 'idCategory must be a number' 
    }),
    quantity: z.coerce.number({
        required_error: 'quantity is required',
        invalid_type_error: 'quantity must be a number' 
    })
}) 

export const validateProductData = (data) =>{
    try{
        const validateProduct = productSchema.safeParse(data);
        return validateProduct
    }catch(err){
        return{ error: err.error}
    }
}

const editProductSchema = productSchema.partial();
export const validateEditProduct = (data) =>{
    return editProductSchema.safeParse(data)
}