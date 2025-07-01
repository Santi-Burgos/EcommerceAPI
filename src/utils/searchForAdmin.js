import connection from "../config/database.js";

class SearchAdmin {
    static async byEmail(adminAddressMail){
        try{
        const searchByEmailAdmin = 'SELECT * FROM userAdmin WHERE adminAddressMail = ?'
        const [rows] = await connection.query(searchByEmailAdmin, [adminAddressMail]);
        return{
                success: true,
                data: rows[0]
            }
        }catch(error){
            throw new Error('Error al realizar esta peticion:' + error.message)
        }
    }

    static async byId(adminID){
        try{
            const searchByIdAdmin = 'SELECT * FROM adminUser WHERE adminAddressMail =?';
            const [rows] = await connection.query(searchByIdAdmin, adminID);
            return{
                success: true,
                data: rows[0]
            }
        }catch(error){
            throw new Error('Error al realizar esta peticion:' + error.message)
        }
    }
}

export default SearchAdmin

