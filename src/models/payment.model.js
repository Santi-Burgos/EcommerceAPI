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

    static async insertOrder(clientID, addressMailID){
        try{
            const statusOrderID = 1;
            const queryOrderBuy = 'INSERT INTO orderBuy(orderDate, totalPrice, idClient, idAddressClient, idStatusOrder) VALLUES (NOW(), ?, ? , ?, ?)'
            const orderBuy = await connection.query( queryOrderBuy ,[clientID,  ,addressMailID, statusOrderID]);
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

    static async insertDetailsOrder(quantity, productPrice, orderID, productID){
        try{
            const queryInsertDetails = 'INSERT INTO orderbuydetails(quantity, priceAtPurchase, idOrderBuy, idProduct) VALUES (?,?,?,?)'
            const resultQuery = await connection.query(queryInsertDetails, [quantity, productPrice, orderID, productID])

            return{
                success: true,
                data: resultQuery
            }
        }catch(error){
            throw new Error('Error al crear los detalles de la orden', + error.message)
        }
    }

    static async insertPayer({objectPayer}){
        try{
            const queryInsertPayer = 'INSERT INTO  payer(idPayer, payerEmail, payerFirstName, payerLastName, payerIdentification, payerPhone) VALUES(?, ?, ?, ?, ?, ?) '
            const resultInsertPayer = await connection.query(queryInsertPayer, [objectPayer])
            const payerID = resultInsertPayer.insertId;
            
            return{
                success: true,
                data: resultInsertPayer,
                payerID: payerID
            }
        }catch(error){
            throw new Error('Error al crear el payer', + error.message)
        }
    }

    static async insertPayment({objectPayment}){
        try{
            const queryInsertPayment = 'INSERT INTO `payment`(`idPayment`, `authorizationCode`, `paymentStatus`, `paymentDetails`, `paymentDateApproved`, `paymentLastFourDigits`, `paymentOrderId`, `idPayer`, `idOrderBuy`, `paymentTransactionAmout`, `paymentNetReceivedAmount`) VALUES (?,?,?,?,?,?,?,?,?,?,?) '
            const resultInsertPaymet = await connection.query(queryInsertPayment, [objectPayment])
            

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

}



export default TargetCart 