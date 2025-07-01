import {z} from 'zod'; 

const adminUserSchema = z.object({
    adminName: z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string'
    }),
    adminAddressMail: z.string({
        required_error: 'Address mail is required',
        invalid_type_error: 'Name must be a string'
    }),
    passwordAdmin: z.string().min(8, {
        message: 'Password must be at least 5 characters long'
    }),
    idRol: z.coerce.number({
        invalid_type_error: 'idRol must be a number'
    })
})

export const validateAdminAccount = (data) =>{
    try{
        const adminValidate = adminUserSchema.safeParse(data);
        return adminValidate
    }catch(err){
        return{error: err.error}
    }
}

const editAdminUserSchema = adminUserSchema.partial();

export const validateEditAdmin = (data) =>{
    return editAdminUserSchema.safeParse(data)
}