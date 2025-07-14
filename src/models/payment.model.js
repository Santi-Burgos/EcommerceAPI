import { connect } from "http2";
import connection from "../config/database.js";

class TargetCart{
    static async selectCartForPay(clientID){
        try{
            const querySelectCart = 'SELECT product.idProduct, product.sku, product.productName, product.productDescription, product.productPrice, cart.quantityCart FROM cart INNER JOIN product ON product.idProduct = cart.idProduct WHERE cart.idClient = ?';
            const [rows] = await connection.query(querySelectCart, [clientID]);

            return  rows
        }catch(error){
            throw new Error('Error al seleccionar el carrito' + error.message )
        }
    }
    static async totalPrice(clientID){
        try{
            const querySum = 'SELECT SUM(product.productPrice * cart.quantityCart) AS totalPrice FROM cart JOIN product ON cart.idProduct = product.idProduct WHERE cart.idClient = ?'
            const [rows] = await connection.query(querySum, [clientID])
            return rows[0]

        }catch(error){
            throw new Error('Error al sumar el total del carro' + error.message)
        }
    }

    static async insertOrder(priceOrder, clientID, addressMailID){
        try{
            const statusOrderID = 1;
            const queryOrderBuy = 'INSERT INTO orderBuy(orderDate, totalPrice, idClient, idAddressClient, idStatusOrder) VALUES (NOW(), ?, ? , ?, ?)'

            const [orderBuy] = await connection.query( queryOrderBuy, [ priceOrder, clientID, addressMailID, statusOrderID]);

            const orderID = orderBuy.insertId;
            return{
                orderID,
                message:{ message:
                    'Order buy create'}
            }
        }catch(error){
            throw new Error('Error al crear la orden de compra' + error.message)
        }
    }

    static async insertDetailsOrder(quantityCart, productPrice, orderID, productID){
        try{
            const queryInsertDetails = 'INSERT INTO orderbuydetails(quantity, priceAtPurchase, idOrderBuy, idProduct) VALUES (?,?,?,?)'
            const [resultQuery] = await connection.query(queryInsertDetails, [quantityCart, productPrice, orderID, productID])

            return{
                success: true,
                data: resultQuery
            }
        }catch(error){
            throw new Error('Error al crear los detalles de la orden', + error.message)
        }
    }

    static async insertPayer(objectPayer){
        try{
            const values = [
                objectPayer.idPayer, 
                objectPayer.payerEmail, 
                objectPayer.payerFirstName, 
                objectPayer.payerLastName, 
                objectPayer.payerIdentification, 
                objectPayer.payerPhone
            ]
            const queryInsertPayer = 'INSERT INTO  payer(idPayer, payerEmail, payerFirstName, payerLastName, payerIdentification, payerPhone) VALUES(?, ?, ?, ?, ?, ?) '
            const [resultInsertPayer] = await connection.query(queryInsertPayer, values)
            const payerID = resultInsertPayer.insertId;
            return{
                success: true,
                data: resultInsertPayer,
                payerID: payerID
            }
        }catch(error){
            throw new Error('Error al crear el payer: ' + error.message)
        }
    }

    static async insertPayment(objectPayment){
        const values = [
            objectPayment.idPayment,
            objectPayment.authorizationCode,
            objectPayment.paymentStatus,
            objectPayment.paymentDetails,
            objectPayment.PaymentDateApproved,
            objectPayment.paymentLastFourDigits,
            objectPayment.paymentTransactionAmount,
            objectPayment.paymentNetReceivedAmount,
            objectPayment.idOrdenBuy,
            objectPayment.idPayer
        ]

        try{
            const queryInsertPayment = 'INSERT INTO `payment`(`idPayment`, `authorizationCode`, `paymentStatus`, `paymentDetails`, `paymentDateApproved`, `paymentLastFourDigits`, `paymentOrderId`, `idPayer`, `idOrderBuy`, `paymentTransactionAmout`, `paymentNetReceivedAmount`) VALUES (?,?,?,?,?,?,?,?,?,?,?) '
            const resultInsertPaymet = await connection.query(queryInsertPayment, values)   

            return{
                success: true,
                data: resultInsertPaymet
            }
        }catch(error){
            throw new Error('Error al crear payment', + error.message)
        }
    }

    static async editStatusOrder(statusOrder, orderID){
        try{
            const editStatus = 'UPDATE `orderbuy` SET idStatusOrder = ? WHERE idOrder = ?'
            const resultEditStatus = await connection.query(editStatus, [statusOrder, orderID])
            
            return{
                success: true,
                data: resultEditStatus
            }
        }catch(error){
            throw new Error('Error al cambiar el estado de la orden' + error.message)
        }
    }

    static async findPaymentById(paymentId){
        try{
            const queryFindPayment = 'SELECT * FROM payment WHERE idPayment = ?'
            const [rows] = await connection.query(queryFindPayment, [paymentId])
            return{
                success: true,
                data: rows
            }
        }catch(error){
            throw new Error('Error al buscar paymentID' + error.message)
        }
    }

}



export default TargetCart 