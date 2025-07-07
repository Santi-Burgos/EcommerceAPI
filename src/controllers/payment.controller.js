import { MercadoPagoConfig, Preference } from "mercadopago";
import TargetCart from "../models/payment.model.js";
import { config as configDotenv } from 'dotenv';
import fetch from "node-fetch";
import Stock from "../models/stock.model.js"
import { stockAvalible } from "../helper/stockAvailable.helper.js";

configDotenv();


//CREATE ORDER    

export const paymentController = async (req, res) => {
    try {
      
    
      const clientID = 12;
      // const clientID = req.user.idUser
      const queryCart = await TargetCart.selectCartForPay(clientID);


      const createOrder = await TargetCart.insertOrder(clientID, addressID); 
      const orderID = createOrder.orderID

      for(const product of queryCart){

      const quantityCart = product.quantityCart
      const productPrice = product.productPrice
      const productID = product.idProduct

      const stock = await stockAvalible(quantityCart, productID)
      if(!stock){
        return stock
      }
      await TargetCart.insertDetailsOrder(quantityCart, productPrice,orderID, productID)
      await Stock.reservedStock(quantityCart, productID)
    } 
        const client = new MercadoPagoConfig({
                accessToken: process.env.MERCADOPAGO_API_KEY,
                options: { timeout: 5000 }
             });
        const payment = new Preference(client);
        console.log(process.env.MERCADOPAGO_API_KEY)

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
    const paymentId = req.body.data?.id
    if(!paymentId) return res.sendStatus(400)

      try{
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`,{
            headers:{
              Authorization: `Bearer ${process.env.MERCADOPAGO_API_KEY}`
            }
        });
        const payment = await response.json();
        console.log('ACA ESTA payer',payment.payer)


        
        res.sendStatus(200);
      }catch(e) {
        console.error(e);
        res.sendStatus(500);
      }

}