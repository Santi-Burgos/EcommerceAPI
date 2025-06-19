import {z} from 'zod';

const clientSchema = z.object({
        nameClient: z.string({
            required_error: 'Name is required',
            invalid_type: 'Name must be a string',
        }),
        lastNameClient: z.string({
            required_error: 'lastname is required',
            invalid_type: 'Name must be a string'
        }),
        addressMailClient:z.string().email({
            required_error: 'Email is required',
            invalid_type_error: 'Email invalid, example@gmail.com'
        }),
        passwordClient: z.string().min(5, {
            message: 'Password must be at least 5 characters long',
        }),
        numberPhoneClient: z.number({
            invalid_type_error: 'Number phone must be a number'
        })
})

export const validateCreateAccount = (data) =>{
    try{
        const clientValidate = clientSchema.safeParse(data);
        return clientValidate
    }catch(err){
        return{error: err.error}
    }
}

const editClientSchema = clientSchema.partial();

export const validateEditAccount = (data) => {
  return editClientSchema.safeParse(data);
};


