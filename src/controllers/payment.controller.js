import { MercadoPagoConfig, Preference } from "mercadopago";
import TargetCart from "../models/payment.model.js";
import Product from "../models/product.model.js";
import { config as configDotenv } from 'dotenv';
import fetch from "node-fetch";
import Stock from "../models/stock.model.js"
import { verifyProductExist } from "../helper/productExist.helper.js";
import { stockAvailable } from "../helper/stockAvailable.helper.js";

configDotenv();

export const paymentController = async (req) => {
  try {

    const clientID = 12;
    const addressMailID = 41;

    /* const clientID = req.user.idUser
    const addressMailID = req.body */

    //get all product on the cart
    const queryCart = await TargetCart.selectCartForPay(clientID);

    //sum cart prices
    const querySumCart = await TargetCart.totalPrice(clientID)

    //generate the price order
    const priceOrder = querySumCart.totalPrice

    //create order
    const createOrder = await TargetCart.insertOrder(priceOrder, clientID, addressMailID);
    const orderID = createOrder.orderID

    for (const product of queryCart) {

      console.log(product)
      const quantityCart = product.quantityCart
      const productPrice = product.productPrice
      const productID = product.idProduct

      // Validate if the product exists
      const isProduct = await Product.productExist(productID)
      const verifyProduct = verifyProductExist(isProduct);
      console.log(verifyProduct)
      if (!verifyProduct) {
        return verifyProduct
      }
      //validate if the price is correct
      const isPrice = await Product.checkPriceProduct(productID, productPrice)
      if (!isPrice) {
        return {
          success: false,
          error: {
            message: `El precio del producto con la id ${productID} ha cambiado, por favor actualice su carrito`
          }
        }
      }
      //validate if have stock
      const stock = await Stock.getStockAvailable(productID)
      const verifyStock = await stockAvailable(quantityCart, stock)
      if (!verifyStock) {
        return verifyStock
      }
      // create details order
      const details = await TargetCart.insertDetailsOrder(quantityCart, productPrice, orderID, productID)

      if (!details){ 
        console.log('no se ha podido crear detalle'); 
      }else { 
        console.log('detalle creado') 
      }
      //last stock validate and reserved for the transaction

      const haveStock = await Stock.reservedStock(quantityCart, productID);

      if (!haveStock.affectedRows){
        return {
          success: false,
          message: 'No se ha podido reservar el stock'
        }
      } 
    }

    //Mercado pago configs

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_API_KEY,
      options: { timeout: 5000 }
    });
    const payment = new Preference(client);

    if(process.env.MERCADOPAGO_API_KEY){
      console.log('Cliente inicilizado');
    }

    const items = queryCart.map(item => ({
      title: item.productName,
      description: item.productDescription,
      quantity: item.quantityCart,
      unit_price: Number(item.productPrice),
      currency_id: 'ARS'
    }));

    let preference = {
      items: items,
      back_urls: {
        failure: "http://localhost:3000/api/payment/failure",
        pending: "http://localhost:3000/api/payment/pending",
        success: "http://localhost:3000/api/payment/success",
      },
      notification_url: "https://e7c940d6e665.ngrok-free.app/api/payment/webhook",
      external_reference: orderID
    };

    console.log(preference)

    const resultPayment = await payment.create({ body: preference });
    console.log(resultPayment.init_point)


    if (resultPayment) {
      return {
        success: true
      }
    }
  } catch (err) {
    return {
      sucess: false,
      error: {
        name: err.name || 'InternalError',
        message: err.message || 'Unexpected error',
        stack: err.stack
      }
    }
  }
};

export const receiveWebhook = async (req) => {
  try {
    const id = req.body.data?.id || req.query.id || req.body.id;
    const type = req.body.type || req.body.topic || req.query.type || req.query.topic

    if (!id) {
      console.warn("Webhook inválido: no se recibió ID de pago");
      return { status: 400, body: { error: "Missing ID" } };
    }

    if (type === 'payment') {
      await safeProcessPayment(id)
    } else if (type === 'merchant_order') {
      const moResponse = await fetch(`https://api.mercadopago.com/merchant_orders/${id}`, {
        headers: { Authorization: `Bearer ${process.env.MERCADOPAGO_API_KEY}` }
      })

      const merchantOrder = await moResponse.json();
      if (merchantOrder && merchantOrder.payments && merchantOrder.payments.length > 0) {
        for (const tryPay of merchantOrder.payments) {
          if (tryPay && tryPay.id) {
            await safeProcessPayment(tryPay.id)
          } else {
            console.warn("Payment sin id en merchant_order")
          }
        }
      } else {
        console.warn("merchant_order sin payment asocia dos")
      }
    } else {
      console.log("evento ignorado, type:", type)
    }
    console.log("Webhook procesado correctamente")
    return { status: 200, body: { success: true, message: "Procesado correctamente" } }
  } catch (err) {
    console.error("Error al procesar el webhook", err.message)
    return { status: 200, body: { success: true, message: "Pago no procesado" } };

  }

  //mover a otro archivo

  async function safeProcessPayment(paymentId) {
    try {
      if (!paymentId) {
        console.warn("Intento de procesar paymentId vacío");
        return;
      }

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

      const payerID = payment.payer.id
      const dataPayer = await TargetCart.findPayerById(payerID)

      if (!dataPayer) {
        const objectPayer = {
          idPayer: payerID,
          payerEmail: payment.payer.email,
          payerFirstName: payment.payer.first_name,
          payerLastName: payment.payer.last_name,
          payerIdentification: payment.payer.identification?.number,
          payerPhone: payment.payer.phone?.number,
        };

        try {
          await TargetCart.insertPayer(objectPayer);
          console.log(`Payer creado: ${payerID}`);
        } catch (err) {
          console.error("Error al crear payer:", err.message);
          return;
        }
      } else {
        console.log('Payer existente asociado a la id:', payerID);
      }

      const paymentID = payment.id

      const existingPayment = await TargetCart.findPaymentById(paymentID);

      if (!existingPayment) {
        const objectPayment = {
          idPayment: paymentID,
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

        

        try {
          await TargetCart.insertPayment(objectPayment);
        } catch (err) {
          return{
            success: false,
            error: {
              message: 'No se pudo crear el payment' + err.message
            }
          }
        }
      } else {
        console.log("Payment ya existe, no se inserta:", existingPayment);
      }

      if (paymentStatus === 'approved') {
        await TargetCart.editStatusOrder(2, orderID);
      } else if (paymentStatus === 'rejected') {
        await TargetCart.editStatusOrder(3, orderID);
      }
      console.log("Payment procesado correctamente");
      return { success: true, message: "Payment creado correctamente" }

    } catch (err) {
      console.error("Error al procesar el payment:", err.message);
      return;
    }
  }
};