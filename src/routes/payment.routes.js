import express from 'express'
import {paymentController, receiveWebhook} from '../controllers/payment.controller.js'
import { createOrderView, paymentView } from '../views/payment.view.js';

const paymentRoutes = express.Router();

paymentRoutes.post('/create-order', async(req, res)=>{
    const result = await paymentController(req)
    createOrderView(result, res)
});

paymentRoutes.get('/success',  (req, res)=>{
    res.send('success')
})
paymentRoutes.get('/failure', (req, res)=>{
    
})
paymentRoutes.get('/pending', (req, res)=>{

})

paymentRoutes.post('/webhook', async(req, res) =>{
    const result = await receiveWebhook(req, res)
    paymentView(result, res)
})

export default paymentRoutes