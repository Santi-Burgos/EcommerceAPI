import Search from "../utils/search.js";
import bcrypt from 'bcrypt';
import { tokenGenerate } from "../utils/tokenGenerate.js";

export const clientLogin = async(req) =>{
    try{
        const {addressMailClient, passwordClient} = req.body;
        const loginClient = await Search.byEmail(addressMailClient)

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