import express from 'express';
import { upload } from '../middlewares/upload.middleware.js'
import { authToken } from "../middlewares/auth.middleware.js";
import { clientLogin } from "../controllers/auth.controller.js";
import { createClientAccountController, deleteClientAccountController, editClientAccountController } from "../controllers/client.controller.js";
import { createAccountClientView, editAccountClientView, changeProfilePicView, deleteAccountClientView } from "../views/client.view.js";
import { loginClientView, logoutView } from "../views/login.view.js";
import { createAddressClientController, deleteAddressStreetController, editAddressStreetController, getAddressController } from "../controllers/addressClient.controller.js";
import { createStreetAddressView, editStreetAddressView, deleteAddressStreetView, getAddressView } from '../views/addressStreet.view.js';
import { editProfileImageController } from '../controllers/imagesEdit.controller.js';

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

clientRoutes.post('/login-client', async (req, res, next) => {
  const result = await clientLogin(req)
  loginClientView(result, res)
})

clientRoutes.post('/edit-client', authToken, async (req, res, next) => {
  const result = await editClientAccountController(req)
  editAccountClientView(result, res)
})

clientRoutes.post('/change-profile-pic', authToken, (req, res, next) => {
  req.isMultiple = false;
  next();
},
  upload.single('profile'),
  async (req, res) => {
    const result = await editProfileImageController(req);
    changeProfilePicView(result, res);
  }
);

clientRoutes.delete('/:idClient', authToken, async (req, res, next) => {
  const result = await deleteClientAccountController(req)
  deleteAccountClientView(result, res)
})

clientRoutes.post('/create-address-street', authToken, async (req, res, next) => {
  const result = await createAddressClientController(req)
  createStreetAddressView(result, res)
})

clientRoutes.post('/edit-address-street', authToken, async (req, res, next) => {
  const result = await editAddressStreetController(req)
  editStreetAddressView(result, res)
})

clientRoutes.delete('/address/:idStreet', authToken, async (req, res, next) => {
  const result = await deleteAddressStreetController(req)
  deleteAddressStreetView(result, res)
})

clientRoutes.get('/address/get-address', authToken, async (req, res, next) => {
  const result = await getAddressController(req);
  getAddressView(result, res)
})

clientRoutes.post('/logout-client', (req, res) => {
  logoutView(res)
})

export default clientRoutes