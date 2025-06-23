import { success } from 'zod/v4'
import StreetAddress from '../models/address.model.js'
import { validateAddressClient } from '../validations/addressClient.validations.js'

export const createAddressClientController = async(req) =>{
    try{

        const validationAddress = validateAddressClient(req.body)
      
        if(!validationAddress.success){
            return{
                success:false,
                error: {
                    name: 'zodError',
                    issues: validationAddress.error.issues
                }
            }
        }

        const clientID = req.user.idUser; 

        const addressToCreate = validationAddress.data;
        addressToCreate.clientID = clientID;

        const addressCreate = await StreetAddress.createStreetAddress(addressToCreate);

        if (!addressCreate.success) {
            return {
                success: false,
                error: addressCreate.error
            };
        }

        return{
            success: true,
            data: addressCreate.data[0]
        }
    }catch(err){ 
        return{
            success:false, 
            error:{
                name: err.name || 'InternalError', 
                message: err.message || 'Unexpected error',
                 stack: err.stack
            }
        }
    }
}