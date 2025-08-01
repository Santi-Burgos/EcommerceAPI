import bcrypt from 'bcrypt';
import { tokenGenerate } from "../utils/tokenGenerate.js";
import Client from '../models/client.model.js'
import Admin from '../models/admin.model.js';


export const clientLogin = async(req) =>{
    try{
       
        const {addressMailClient, passwordClient} = req.body;
        const loginClient = await Client.findClientByEmail(addressMailClient)

        if(!loginClient){
            return {
                success: false,
                error:{name: 'User not found'}
            }
        }

        const isMatch = await bcrypt.compare(passwordClient, loginClient.data.passwordClient);
        
        if(!isMatch){
            return{
                success: false,
                error: {name: 'Password invalid'}
            }
        }
        const idClient = loginClient.data.idClient
        const tokenLogin = await tokenGenerate(idClient, addressMailClient)
        return({
                success: true,
                token: tokenLogin
            })
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
}

export const adminLoginController = async(req) =>{
    try{
        const {adminAddressMail, passwordAdmin} = req.body;
        const loginAdmin = await Admin.findAdminByEmail(adminAddressMail);
        
        if(!loginAdmin){
            return{
                success: false,
                error: {name: 'Admin not found' }
            }
        }
        
        const isMatch = await bcrypt.compare(passwordAdmin, loginAdmin.data.passwordAdmin)  
        
        if(!isMatch){
            return{
                success: false,
                error:{name: 'Password invalid'}
            }
        }
        const idAdmin = loginAdmin.data.idAdmin
        const idRol = loginAdmin.data.idRol
        const tokenLoginAdmin = await tokenGenerate(idAdmin, adminAddressMail, idRol)
        
        return({
            success: true,
            token: tokenLoginAdmin
        })
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
}