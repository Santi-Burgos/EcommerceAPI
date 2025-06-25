import express from 'express'
import { createProductController } from "../controllers/product.controller.js";
import { createProductView } from '../views/product.view.js';
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


export default productRoutes