import connection from '../config/database.js';

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
            return{
                success: false, 
                error
            }
        }
    }
}

export default StreetAddress