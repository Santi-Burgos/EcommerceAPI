import express from 'express'
import { createProductController } from "../controllers/product.controller.js";
import {editProductImgController} from '../controllers/imagesEdit.controller.js'
import { createProductView, changeProductImageView } from '../views/product.view.js';
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

productRoutes.post(
    '/edit-product',
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


export default productRoutes