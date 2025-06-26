import Client from "../models/client.model.js";
import { hashPassword } from "../utils/passwordHash.js";
import { validateCreateAccount, validateEditAccount } from "../validations/client.validations.js";


export const createClientAccountController = async (req) => {
  try {
    const validationClientAccount = validateCreateAccount(req.body);

    if (!validationClientAccount.success) {
      return {
        success: false,
        error: {
          name: 'ZodError',
          issues: validationClientAccount.error.issues,
        }
      };
    }

    const { passwordClient, ...rest } = validationClientAccount.data;

    const passwordClientHashed =  await hashPassword(passwordClient);
    let imgName = req.file ? req.file.filename : null;
    let imgUrl = req.file ? `http://localhost:3000/upload/profile/${req.file.filename}` : `http://localhost:3000/upload/default-icon`;

    if(!imgName){
      imgName = 'defaulticon'
    }
    if(!imgUrl){
      imgUrl = `http://localhost:3000/upload/default-icon`
    }
    
    const clientToCreate = { ...rest, passwordClientHashed, imgUrl, imgName};
    
    const newClientAccount = await Client.createClientAccount(clientToCreate);
    return {
      success: true,
      data: newClientAccount
    };
  }catch (err){
    return {
      success: false,
      error: {
        name: err.name || 'InternalError',
        message: err.message || 'Unexpected error',
        stack: err.stack
      }
    };
  }
};

export const editClientAccountController = async(req) =>{
  try{
    const validateEditClient = validateEditAccount(req.body);
    if(!validateEditClient.success){
      return{
        success: false,
        error: {
          name:'ZodError',
          issues: validateEditClient.error.issues
        }
      }
    }
    const clientID = req.user.idUser

    let {passwordClient, ...rest} = validateEditClient.data

    
    if(passwordClient){
       passwordClient =  await hashPassword(passwordClient);
    }
    const clientToEdit ={...rest, passwordClient}  

    const clientAccountUpdate = await Client.editClientAccount(clientToEdit, clientID);
    return{
      success: true,
      data: clientAccountUpdate
    }
  }catch(err){
    return{
      success: false,
      error: {
        name: err.name || 'InternalError',
        message: err.message || 'Unexpected error',
        stack: err.stack
      }
    }
  }
};
