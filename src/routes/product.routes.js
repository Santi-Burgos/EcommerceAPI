import express from 'express'
import { createProductController, getProductController,deleteProductController } from "../controllers/product.controller.js";
import {editProductImgController} from '../controllers/imagesEdit.controller.js'
import { createProductView, changeProductImageView, deleteProductView, listProductView } from '../views/product.view.js';
import { upload } from '../middlewares/upload.middleware.js';
import { requieredPermission } from '../middlewares/requiredPermission.middleware.js';
import { authToken } from '../middlewares/auth.middleware.js';

const productRoutes = express.Router();



productRoutes.post(
    '/create-product', authToken, 
    async(req, res, next) =>{
        req.isMultiple = true,
        next()
    },
    upload.array('product', 10),
    async(req, res)=>{
        await requieredPermission('product_upload', req.user.idRol)
        const result = await createProductController(req)
        createProductView(result, res)
    }
)

productRoutes.get(
    '/product-list', authToken, async(req, res, next)=>{
        await requieredPermission('view_product', req.user.idRol)
        const result = await getProductController(req)
        listProductView(result, res)
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
        await requieredPermission('product_edit', req.user.idRol)
        const result = await editProductImgController(req)
        changeProductImageView(result, res)
    }
)

productRoutes.delete('/:id', authToken, async(req, res, next)=>{
    await requieredPermission('product_delete', req.user.idRol)
    const result = await deleteProductController(req)
    deleteProductView(result, res)
});


export default productRoutes