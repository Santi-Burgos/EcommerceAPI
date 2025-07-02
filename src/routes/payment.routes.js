import express from 'express'
import {paymentController, receiveWebhook} from '../controllers/payment.controller.js'

const paymentRoutes = express.Router();

paymentRoutes.post('/create-order', async(req, res)=>{
    const result = paymentController(req)
    res.send('creando orden')
});

paymentRoutes.get('/success',  (req, res)=>{
    res.send('success')
})
paymentRoutes.get('/failure', (req, res)=>{
    
})
paymentRoutes.get('/pending', (req, res)=>{

})

paymentRoutes.post('/webhook', receiveWebhook)

export default paymentRoutes