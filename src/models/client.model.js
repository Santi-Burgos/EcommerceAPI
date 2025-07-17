import  connection  from "../config/database.js";
import { buildDynamicUpdateQuery } from "../helper/dinamicQuery.helper.js";

class Client{

    // create the cliente and post profile pic
    static async createClientAccount({nameClient, lastNameClient, addressMailClient, passwordClientHashed, numberPhoneClient, imgUrl, imgName}){
        const conn = await connection.getConnection();
        try{
            await conn.beginTransaction();

            const [resultClientQuery] =  await conn.query('INSERT INTO `client`(`nameClient`, `lastNameClient`, `addressMailClient`, `passwordClient`, `numberPhoneClient`) VALUES (?,?,?,?,?)', [nameClient, lastNameClient, addressMailClient, passwordClientHashed, numberPhoneClient]);

            const clientID = resultClientQuery.insertId;

            await conn.query(
                'INSERT INTO `imageclient`(`imgUrl`, `imgname`, `idClient`) VALUES (?,?,?)',
                [imgUrl, imgName, clientID])

            await conn.commit();
            return{
                success: true,
                data: resultClientQuery
            }
        }catch (error){
            await conn.rollback();
                
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('El correo electrónico ya está registrado');
            }
            throw new Error('Error al crear el cliente: ' + error.message);
            
        }finally{
            conn.release();
        }
    }
    // Only update client
    static async editClientAccount(clientToEdit, clientID){
        try{   
            const fullDataToUpdate = { ...clientToEdit, idClient: clientID};
            const { query, values } = buildDynamicUpdateQuery('client', fullDataToUpdate, 'idClient');
            const result = await connection.query(query, values);
            return {
            success: true,
            data: result
            };
        }catch(error){
            throw new Error('Error al editar cliente' + error.message); 
        }
    }

    //delete all relations whit client
    static async deleteAccountClient(clientID){
        try{
            const deleteAccount = 'DELETE FROM client WHERE idClient = ?';
            const queryDeleteAccount = await connection.query(deleteAccount, clientID);
            return{
                success: true, 
                data: queryDeleteAccount
            }
        }catch(error){
            throw new Error('Error al editar cliente');
        }
    }
    static async findClientByEmail(addressMailClient){
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

    static async findClientById(clientID){
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

export default Client