import { MercadoPagoConfig, Preference } from "mercadopago";
import TargetCart from "../models/payment.model.js";
import { config as configDotenv } from 'dotenv';
import fetch from "node-fetch";
import { stockAvalible } from "../helper/stockAvailable.helper.js";

configDotenv();


//CREATE ORDER    

export const paymentController = async (req, res) => {
    try {
       //validacion de stock
      const queryCart = await TargetCart.selectCartForPay(clientID);

      const quantityCart = queryCart.quantityCart
      const productID = queryCart.idProduct

      const stock = await stockAvalible(quantityCart, productID)
      if(!stock){
          return stock
      }

      const createOrderDetails = await ();
      


       
       //Reservar stock dentro de orderDetails y creacion de orderBuy 
      

      
        const client = new MercadoPagoConfig({
                accessToken: process.env.MERCADOPAGO_API_KEY,
                options: { timeout: 5000 }
             });
        const payment = new Preference(client);
        console.log(process.env.MERCADOPAGO_API_KEY)
    const clientID = 12;

    const items = queryCart.map(item => ({
      title: item.productName,
      description: item.productDescription,
      quantity: item.quantityCart,
      unit_price: Number(item.productPrice),
      currency_id: 'ARS'
    }));

    let preference = {
      items: items,
      back_urls:{
        failure: "http://localhost:3000/api/payment/failure",
        pending: "http://localhost:3000/api/payment/pending",
        success: "http://localhost:3000/api/payment/success",
      },
      notification_url: "https://bad6-168-90-74-100.ngrok-free.app/api/payment/webhook"
      
    };


    console.log('Payload a enviar:', JSON.stringify( {preference} , null, 2));

    const resultPayment = await payment.create( {body: preference} );

    if(resultPayment){
        console.log(resultPayment);
    }

  } catch (err) {
    console.error('Error en paymentController:', err);
  }
};


export const receiveWebhook = async(req, res) =>{
    console.log(req.query);
    console.log('--- NUEVO WEBHOOK ---');
    console.log('Método:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));



    const paymentId = req.body.data?.id
    if(!paymentId) return res.sendStatus(400)

      try{
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`,{
            headers:{
              Authorization: `Bearer ${process.env.MERCADOPAGO_API_KEY}`
            }
        });
        const payment = await response.json();
        console.log('ACA ESTA PAYMENT',payment)
        
        res.sendStatus(200);
      }catch(e) {
        console.error(e);
        res.sendStatus(500);
      }

}