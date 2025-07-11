import { MercadoPagoConfig, Preference } from "mercadopago";
import TargetCart from "../models/payment.model.js";
import { config as configDotenv } from 'dotenv';
import fetch from "node-fetch";
import Stock from "../models/stock.model.js"
import { stockAvalible } from "../helper/stockAvailable.helper.js";
import { error } from "console";

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

export const receiveWebhook = async (req, res) => {
  try {
    const id = req.body.data?.id || req.query.id || req.body.id;
    const type = req.body.type || req.body.topic || req.query.type || req.query.topic

    if (!id) {
      console.warn("❌ Webhook inválido: no se recibió ID de pago");
      return res.status(400).json({ error: "Missing ID" });
    }

    if(type === 'payment'){
       await safeProcessPayment(id)
    }else if(type === 'merchant_order'){
      const moResponse = await fetch(`https://api.mercadopago.com/merchant_orders/${id}`, {
        headers: { Authorization: `Bearer ${process.env.MERCADOPAGO_API_KEY}` }
      })
      
      const merchantOrder = await moResponse.json();
      if(merchantOrder && merchantOrder.payments && merchantOrder.payments.length > 0){
        for(const tryPay of merchantOrder.payments){
          if(tryPay && tryPay.id){
            await safeProcessPayment(tryPay.id)
          }else{
            console.warn("Payment sin id en merchant_order")
          }
        }
      }else{
        console.warn("merchant_order sin payment asociados")
      }
    }else{
      console.log("evento ignorado, type:", type)
    }
    console.log("Webhook procesado correctamente")
  }catch(err){
    console.error("Error al procesar el webhook", err.message)
    if(!res.headersSent){
      return res.sendStatus(200)
    }
  }


    // SAFE FUNCTION
async function safeProcessPayment(paymentId) {
  try {
    if (!paymentId) {
      console.warn("Intento de procesar paymentId vacío");
      return;
    }
    // const exists = await TargetCart.findPaymentById(paymentId);
    // if (exists) {
    //   console.log("Payment ya procesado, id:", paymentId);
    //   return;
    // }

    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_API_KEY}`
      }
    });

    const payment = await response.json();
    if (!payment || !payment.status) {
      console.warn("payment no encontrado", payment, paymentId);
      return;
    }

    const orderID = payment.external_reference;
    const paymentStatus = payment.status;

    if (!payment.payer || !payment.payer.id) {
      console.warn("payment sin payer válido", payment);
      return;
    }

    const objectPayer = {
      idPayer: payment.payer.id,
      payerEmail: payment.payer.email,
      payerFirstName: payment.payer.first_name,
      payerLastName: payment.payer.last_name,
      payerIdentification: payment.payer.identification?.number,
      payerPhone: payment.payer.phone?.number,
    };

    let payerData;
    try {
      payerData = await TargetCart.insertPayer(objectPayer);
    } catch (err) {
      console.error(err.message);
      return { success: false, error: "No se pudo crear el payer" };
    }
     
    const payerID = payerData.payerID;

    const objectPayment = {
      idPayment: payment.id,
      authorizationCode: payment.authorization_code,
      paymentStatus,
      paymentDetails: payment.status_detail,
      paymentDateApproved: payment.date_approved,
      paymentLastFourDigits: payment.card?.last_four_digits || null,
      paymentTransactionAmount: payment.transaction_details?.installment_amount,
      paymentNetReceivedAmount: payment.transaction_details?.net_received_amount,
      idOrderBuy: orderID,
      idPayer: payerID,
    };

    let paymentData
    try{
    paymentData = await TargetCart.insertPayment(objectPayment);
    } catch(err){
      return { success: false, error: "No se pudo crear el payment" };
    }

    if (paymentStatus === 'approved') {
      await TargetCart.editStatusOrder(2, orderID);
    } else if (paymentStatus === 'rejected') {
      await TargetCart.editStatusOrder(3, orderID);
    }
    console.log("✅ Payment procesado correctamente");
    return;

  } catch (err) {
    console.error("❌ Error al procesar el payment:", err.message);
    return;
  }
}
};