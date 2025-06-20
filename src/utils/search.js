import connection from "../config/database.js";

class Search {
    static async byEmail(addressMailClient){
        try{
        const searchByEmail = 'SELECT * FROM client WHERE addressMailClient = ?'
        const [rows] = await connection.query(searchByEmail, [addressMailClient]);
        return{
                success: true,
                data: rows[0]
            }
        }catch(error){
            throw new Error('Error al realizar esta peticion:' + error.message)
        }
    }

    static async byId(clientID){
        try{
            const searchById = 'SELECT * FROM client WHERE idClient =?';
            const [rows] = await connection.query(searchById, clientID);
            return{
                success: true,
                data: rows[0]
            }
        }catch(error){
            throw new Error('Error al realizar esta peticion:' + error.message)
        }
    }
}

export default Search

