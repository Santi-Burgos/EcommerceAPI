import connection from '../config/database.js';
import { buildDynamicUpdateQuery } from '../helper/dinamicQuery.helper.js';

class StreetAddress {

    static async createStreetAddress({mainStreet, crossStreet, addressNumber, floorDepto, idPostalCode, clientID}){
        try{

            const createAddressStreet  = 'INSERT INTO `addressclient`(`mainStreet`, `crossStreet`, `addressNumber`, `floorDepto`, `idPostalCode`, `idClient`) VALUES (?,?,?,?,?,?)';
            const queryAddressStreet = await connection.query(createAddressStreet,[mainStreet, crossStreet, addressNumber, floorDepto, idPostalCode, clientID]) 

            return{
                success: true,
                data: queryAddressStreet
            }
        }catch(error){ 
            throw new Error('Error al crear address street' + error.message)
        }
    }

    static async editAddressStreet(AddressToEdit, clientID){
        try{   
            const fullDataToUpdate = {...AddressToEdit, idClient: clientID} 
            const {query, values} = buildDynamicUpdateQuery('addressclient', fullDataToUpdate, 'idClient', { idAddressClient: AddressToEdit.idAddressClient })
            const result = await connection.query(query, values);

            return{
                data:result
            }
        }catch(error){
            throw new Error('Error al editar address' + error.message)
        }
    }

    static async deleteAddressStreet(idAddressStreet, clientID){
        try{
            const queryDeleteAddress = 'DELETE FROM DELETE FROM `addressclient` WHERE idAddressClient = ? AND idClient = ?'

            const resultQuery = await connection.query(queryDeleteAddress, idAddressStreet, clientID);
            
            return{
                success: true,
                data:resultQuery
            }
        }catch(error){
            throw new Error('Error al eliminar address street' + error.message);
        }
    }
}

export default StreetAddress