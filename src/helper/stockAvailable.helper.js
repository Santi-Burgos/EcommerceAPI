import connection from "../config/database.js";

export const stockAvalible = async (cartQuantity, productID) => {
    const queryStockAvalible = 'SELECT idStock, quantity FROM stockproduct WHERE idProduct = ? '

    const [rows] = await connection.query(queryStockAvalible, [productID])
    
    if(rows[0].quantity >= cartQuantity){
        return{
            success: true, 
        }
    }else{
        return{
            success: false,
        }
    }
}