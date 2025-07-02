import { MercadoPagoConfig, Preference } from "mercadopago";
import TargetCart from "../models/payment.model.js";
import { config as configDotenv } from 'dotenv';

configDotenv();


//CREATE ORDER    

export const paymentController = async (req, res) => {
    try {

        const client = new MercadoPagoConfig({
                accessToken: process.env.MERCADOPAGO_API_KEY,
                options: { timeout: 5000 }
             });
        const payment = new Preference(client);
        console.log(process.env.MERCADOPAGO_API_KEY)
    const clientID = 12;
    const queryCart = await TargetCart.selectCartForPay(clientID);

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
      notification_url: "https://e1dd-168-90-74-100.ngrok-free.app/api/payment/webhook"
      
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
    res.sendStatus(200);
}