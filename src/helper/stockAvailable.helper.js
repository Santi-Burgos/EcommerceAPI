import connection from "../config/database.js";

export const stockAvalible = async (cartQuantity, productID) => {
    const queryStockAvalible = 'SELECT idStock, quantity FROM stockproduct WHERE idProduct = ? '

    const [rows] = await connection.query(queryStockAvalible, cartQuantity, productID)
    
    if(rows.quantity > cartQuantity){
        return{
            success: true, 
            message: 'sufficient stock'
        }
    }else{
        return{
            success: false,
            message: 'insufficient stock'
        }
    }
}