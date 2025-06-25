import express from "express";
import { authToken } from "../middlewares/auth.middleware.js";
import {createAdminUserController, editAdminUserController} from '../controllers/admin.controller.js'
import { createAdminUserView, editAdminUserView } from "../views/adminUser.view.js";
import { adminLogin } from "../controllers/auth.controller.js";
import { loginAdminView } from "../views/login.view.js";

const adminRoutes = express.Router();

adminRoutes.post('/create-admin', async(req, res, next)=>{
    const result = await createAdminUserController(req)
    createAdminUserView(result, res)   
})

adminRoutes.post('/login-admin', authToken, async(req, res, next)=>{
    const result = await adminLogin(req)
    loginAdminView(result, res)
})

adminRoutes.post('/edit-admin', authToken, async(req, res, next)=>{
    const result = await editAdminUserController(req)
    editAdminUserView(result, res)
})
export default adminRoutes