import StreetAddress from '../models/address.model.js'
import { validateAddressClient, validateEditAddress } from '../validations/addressClient.validations.js'
import { verifyDuplicateStreet } from '../helper/duplicateStreet.helper.js'


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

        const addressIsValid = await verifyDuplicateStreet(clientID, addressToCreate)

        if (!addressIsValid.success) {
            return {
                success: false,
                error: {
                name: 'DuplicateAddress',
                message: addressIsValid.message
                }
            };
        }
        addressToCreate.clientID = clientID;

        const addressCreate = await StreetAddress.createStreetAddress(addressToCreate);

        if(!addressCreate.success) {
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

export const editAddressStreetController = async(req) =>{
    try{
        const validationEditAddress = validateEditAddress(req.body);
        if(!validationEditAddress.success){
            return{
                success: false,
                error: {
                    name: 'ZodError',
                    issues: validationEditAddress.error.issues
                }
            }
        }
        const clientID = req.user.idUser;

        const addressToEdit = validationEditAddress.data
        
        const AddressEdit = await StreetAddress.editAddressStreet(addressToEdit, clientID);
        return{
            success: true,
            data: AddressEdit
        }
    }catch(err){
        return{
            sucecss: false,
            error: {
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
        }
    }
};

export const deleteAddressStreetController = async(req) =>{
    try{
        const idAddressStreet = req.params.idStreet
        const clientID = req.user.idUser

        const deleteStreetAddress = await StreetAddress.deleteAddressStreet(idAddressStreet, clientID)

        return{
            data: deleteStreetAddress
        }
    }catch{
        return{
            sucecss: false,
            error: {
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
        }
    }
}