import connection from "../config/database.js";

class Offert{
    static async createOffert(){
        const queryCreateOffert = 'INSERT INTO `offert`(`priceOffert`, `discount`, `startDate`, `expirationDate`, `idProduct`) VALUES (?,?,?,?,?)'
        const resultCreateOffert = await connection.query(queryCreateOffert, []);

        return{
            success: true,
            data: resultCreateOffert
        }
    }
    static async autoCompleteOffert(value){    
    }

}

export default Offert