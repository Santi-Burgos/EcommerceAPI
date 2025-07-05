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
}

export default TargetCart