import express from 'express'
import { createProductController, deleteProductController } from "../controllers/product.controller.js";
import {editProductImgController} from '../controllers/imagesEdit.controller.js'
import { createProductView, changeProductImageView, deleteProductView } from '../views/product.view.js';
import { upload } from '../middlewares/upload.middleware.js';

const productRoutes = express.Router();



productRoutes.post(
    '/create-product', 
    async(req, res, next) =>{
        req.isMultiple = true,
        next()
    },
    upload.array('product', 10),
    async(req, res)=>{
        const result = await createProductController(req)
        createProductView(result, res)
    }
)

productRoutes.put(
    '/edit-img-product',
    async(req, res, next)=>{
        req.isMultiple = true
        next();
    },
    upload.array('product', 10),
    async(req, res)=>{
        const result = await editProductImgController(req)
        changeProductImageView(result, res)
    }
)

productRoutes.delete('/:id', async(req, res, next)=>{
    const result = await deleteProductController(req)
    deleteProductView(result, res)
})


export default productRoutes