import connection from "../config/database.js";

class Offert{
    static async createOffert(){
        try{
            const queryCreateOffert = 'INSERT INTO `offert`(`priceOffert`, `discount`, `startDate`, `expirationDate`, `idProduct`) VALUES (?,?,?,?,?)'
            const resultCreateOffert = await connection.query(queryCreateOffert, []);
            return{
                success: true,
                data: resultCreateOffert
            }
        }catch(error){
            throw new Error('Error al crear oferta' + error.message)
        }
    }
    static async deleteOffert(offertID){
        try{    
            const queryDeleteOffert = 'DELETE FROM offert WHERE idOffert = ?';
            const resultDeleteOffert = await connection.query(queryDeleteOffert, offertID)
            return{
                success: true,
                data: resultDeleteOffert
            }

        }catch(error){
            throw new Error('Error al eliminar oferta' + error.message)
        }
    }
}

export default Offert