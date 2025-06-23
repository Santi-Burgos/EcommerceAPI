import express from 'express';
import { authToken } from "../middlewares/auth.middleware.js";
import { clientLogin } from "../controllers/auth.controller.js";
import { createClientAccountController, editClientAccountController } from "../controllers/client.controller.js";
import { createAccountClientView, editAccountClientView } from "../views/client.view.js";
import { loginClientView } from "../views/login.view.js";
import { createAddressClientController } from "../controllers/addressClient.controller.js";
import { createStreetAddressView } from '../views/addressStreet.view.js';

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

router.post('/create-address-street', authToken, async(req, res, next)=>{
    const result = await createAddressClientController(req)
    createStreetAddressView(result, res)   
})


export default router