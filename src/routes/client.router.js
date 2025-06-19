import { createClientAccountController } from "../controllers/client.controlller.js";
import { createAccountClientView } from "../views/client.view.js";
import express from 'express';

const router = express.Router();


router.post('/createClient', async(req, res, next)=>{
    const result = await createClientAccountController(req)
    createAccountClientView(result, res)
})
//router.post('/editClient')
export default router