import { clientLogin } from "../controllers/auth.controller.js";
import { createClientAccountController, editClientAccountController } from "../controllers/client.controlller.js";
import { createAccountClientView, editAccountClientView } from "../views/client.view.js";
import express from 'express';
import { loginClientView } from "../views/login.view.js";
import { authToken } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post('/create-client', async(req, res, next)=>{
    const result = await createClientAccountController(req)
    createAccountClientView(result, res)
})
router.post('/login-client', async(req, res, next)=>{
    const result = await clientLogin(req)
    loginClientView(result, res)
})
router.post('/edit-client', authToken, async (req, res, next)=>{
    const result = await editClientAccountController(req)
    editAccountClientView(result, res)
})


export default router