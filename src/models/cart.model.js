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

}

export default Cart