import express from 'express';
import { authToken } from "../middlewares/auth.middleware.js";
import { clientLogin } from "../controllers/auth.controller.js";
import { createClientAccountController, editClientAccountController } from "../controllers/client.controller.js";
import { createAccountClientView, editAccountClientView } from "../views/client.view.js";
import { loginClientView } from "../views/login.view.js";
import { createAddressClientController } from "../controllers/addressClient.controller.js";
import { createStreetAddressView } from '../views/addressStreet.view.js';

const clientRoutes = express.Router();


clientRoutes.post(
  '/create-client',
  (req, res, next) => {
    req.isMultiple = false;
    next();
  },
  upload.single('profile'),
  async (req, res) => {
    const result = await createClientAccountController(req);
    createAccountClientView(result, res);
  }
);

clientRoutes.post('/login-client', async(req, res, next)=>{
    const result = await clientLogin(req)
    loginClientView(result, res)
})

clientRoutes.post('/edit-client', authToken, async (req, res, next)=>{
    const result = await editClientAccountController(req)
    editAccountClientView(result, res)
})

clientRoutes.post('/create-address-street', authToken, async(req, res, next)=>{
    const result = await createAddressClientController(req)
    createStreetAddressView(result, res)   
})


export default clientRoutes