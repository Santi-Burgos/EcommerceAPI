import express from "express";
import {createAdminUserController} from '../controllers/admin.controller.js'
import { createAdminUserView } from "../views/adminUser.view.js";

const adminRoutes = express.Router();


adminRoutes.post('/create-admin', async(req, res, next)=>{
    const result = await createAdminUserController(req)
    createAdminUserView(result, res)   
})

export default adminRoutes