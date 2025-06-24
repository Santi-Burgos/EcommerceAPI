import Admin from "../models/admin.model.js";
import { validateAdminAccount } from "../validations/adminUser.validations.js";
import { hashPassword } from "../utils/passwordHash.js";

export const createAdminUserController = async(req) =>{
    try{

        const validationAdminUser = validateAdminAccount(req.body);
        if(!validationAdminUser.success){
            return{
                success: false,
                error:{
                    name:'ZodError',
                    issues: validationAdminUser.error.issues,
                }
            };
        }

        const {passwordAdmin, ...rest} = validationAdminUser.data;
        const passwordAdminHashed = await hashPassword(passwordAdmin)
        
        const adminToCreate = {...rest, passwordAdminHashed};

        const newAdminUser = await Admin.createAdminAccount(adminToCreate);
        return{
            success:true, 
            data: newAdminUser
        }
    }catch(err){
        return{
            success:false, 
            error:{
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error', 
                stack: err.stack
            }
        };
    };
};