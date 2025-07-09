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
      const  addressMailID = 41;

      // req.body ADDRESSID
      // const clientID = req.user.idUser

      const queryCart = await TargetCart.selectCartForPay(clientID);

      console.log(queryCart)

      const querySumCart = await TargetCart.totalPrice(clientID)

      const priceOrder = querySumCart.totalPrice
      
      const createOrder = await TargetCart.insertOrder(priceOrder, clientID, addressMailID); 
      const orderID = createOrder.orderID

      for(const product of queryCart){

      const quantityCart = product.quantityCart
      const productPrice = product.productPrice
      const productID = product.idProduct

      const stock = await stockAvalible(quantityCart, productID)
      if(!stock){
        return stock
      }
      
      const details = await TargetCart.insertDetailsOrder(quantityCart, productPrice, orderID, productID)
      
      if(!details) {console.log('no se ha podido crear detalle');}
      else { console.log('detalle creado')}

      const haveStock = await Stock.reservedStock(quantityCart, productID)
      if(!haveStock.success){
        console.log(haveStock.message)
      }else{
        console.log(haveStock.message)
      }
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
      notification_url: "https://b0299621273a.ngrok-free.app/api/payment/webhook",
      external_reference: orderID
    };
    
    console.log(preference)

    const resultPayment = await payment.create( {body: preference} );
    console.log(resultPayment.init_point)


    if(resultPayment){
      return{
        success: true
      }
    }
  }catch(err){
        return{
            sucess: false,
            error:{
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
        }
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
        
        const orderID = payment.external_reference

        const objectPayer = {
          idPayer: payment.payer.id,
          payerFirstName: payment.payer.first_name,
          payerLastName: payment.payer.last_name,
          payerIdentification: payment.payer.identification.number,
          payerPhone: payment.payer.phone.number,
        }
        
        const payerData = await TargetCart.insertPayer(objectPayer);

        const payerID = payerData.payerID

        const paymentStatus = payment.satus 

        const objectPayment = {
          idPayment: payment.id,
          authorizationCode: payment.authorization_code,
          paymentStatus:paymentStatus,
          paymentDetails: payment.status_details,
          paymentDateApproved: payment.date_approved, 
          paymentLastFourDigits: payment.card.last_four_digits,
          paymentTransactionAmount: payment.transaction_details.installment_amount,
          paymentNetReceivedAmount: payment.transaction_details.net_received_amount,
          idOrderBuy: orderID,
          idPayer: payerID
        }


        const paymentResult = await TargetCart.insertPayment(objectPayment);

        let statusOrder;
        if(paymentStatus === 'approved'){
            statusOrder = 2;
        }else{
          statusOrder = 3
        }

        await TargetCart.editStatusOrder(statusOrder, orderID)

        return{
          success: true,
          data: paymentResult,
          message: ('Insercion del payer, payment, y cambio de estado en order hechos correctamente')
        }
      }catch(err){
        return{
            sucess: false,
            error:{
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
        }
    }

}