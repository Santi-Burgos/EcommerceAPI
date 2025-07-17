import connection from "../config/database.js";


class Stock{
    // save the stock for the operation
    static async reservedStock (quantity, productID){ 
        try { 
            const queryReservedStock = 'UPDATE stockproduct SET quantity= quantity - ? WHERE idProduct = ? AND quantity >= ?'
            const [result] = await connection.query(queryReservedStock, [quantity, productID, quantity])


            //sacar de aca

            if (result.affectedRows === 0) {
                return {
                success: false,
                message: 'No se pudo reservar el stock, verifique la cantidad disponible'
                };
            }else{
                return {
                    success: true,
                    message: 'Stock reservado correctamente'
                };
            }
        } catch (error) {
        throw new Error('Error al reservar el stock: ' + error.message);
        }
    }

    static async getStockAvailable(productID){
        try{
            const queryStockAvailable = 'SELECT idStock, quantity FROM stockproduct WHERE idProduct = ? '
            const [rows] = await connection.query(queryStockAvailable, [productID])

            return rows[0] || null

        }catch(error){
            throw new Error('Error al solicitar stock' + error.message)
        }
    }   
}

export default Stock