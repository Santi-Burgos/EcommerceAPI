import express from "express";
import { authToken } from "../middlewares/auth.middleware.js";
import {createAdminUserController, deleteAdminUserController, editAdminUserController, getAllAdminsController} from '../controllers/admin.controller.js'
import { createAdminUserView, deleteAdminUserView, getAdminsView, editAdminUserView } from "../views/adminUser.view.js";
import { adminLoginController } from "../controllers/auth.controller.js";
import { loginAdminView, logoutView } from "../views/login.view.js";
import { requieredPermission } from "../middlewares/requiredPermission.middleware.js";

const adminRoutes = express.Router();

adminRoutes.post('/create-admin', async(req, res, next)=>{
    const result = await createAdminUserController(req)
    createAdminUserView(result, res)   
})

adminRoutes.post('/login-admin', async(req, res, next)=>{
    const result = await adminLoginController(req)
    loginAdminView(result, res)
})

adminRoutes.get('/get-all-admin', authToken, async(req, res, next)=>{
    await requieredPermission('view_admin', req.user.idRol);
    const result = await getAllAdminsController();
    getAdminsView(result, res)
})

adminRoutes.post('/edit-admin', authToken, async(req, res, next)=>{
    const result = await editAdminUserController(req)
    editAdminUserView(result, res)
})

adminRoutes.delete('/delete-admin', authToken, async(req, res, next)=>{
    const result = deleteAdminUserController(req)
    deleteAdminUserView(result, res)
})

adminRoutes.post('/logout-admin',(req, res)=>{
    logoutView(res)
})

export default adminRoutes