import connection from '../config/database.js';

class Cart{

    static async createCart(quantityCart, idProduct,  idClient){
        try{
            
            const idImgProduct = 97; // corregir

            const queryCreateCart = 'INSERT INTO cart(quantityCart, idProduct, idClient, idImgProduct) VALUES (?,?,?,?)'
            
            const resultQueryCart = await connection.query(queryCreateCart,[quantityCart, idProduct, idClient,idImgProduct])
            return{
                success: true,
                data: resultQueryCart
            }
        }catch(error){
            throw new Error('Error al empujar producto al carro' + error.message); 
        }
    }

    static async editItemCart(quantityCart, cartID, clientID){
        try{
            const queryEditCartItem = 'UPDATE `cart` SET `quantityCart`= ? WHERE idCart = ? AND idClient =?'
            const resultEditCart = await connection.query(queryEditCartItem, [quantityCart, cartID, clientID])
            return{
                success: true,
                data: resultEditCart
            }
        }catch(error){
            throw new Error('Error al editar item del carro' + error.message)
        }
    }

    static async deleteProductCart(cartID, clientID){
        try{
            const queryDeleteItemCart = 'DELETE FROM `cart` WHERE idCart = ? AND idClient = ?'
            const resultQuery = await connection.query(queryDeleteItemCart, [cartID, clientID])
            return{
                success: true,
                data: resultQuery
            }
        }catch(error){
            throw new Error('Error al elimnar item del carrito' + error.message)
        }
    }
    

}



export default Cart