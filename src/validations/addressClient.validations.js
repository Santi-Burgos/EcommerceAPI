import {z} from 'zod';

const addressSchema = z.object({
    mainStreet: z.string({
        required_error: 'Main street is required', 
        invalid_type: 'Main street must be a string',
    }),
    crossStreet: z.string({
        invalid_type: 'Cross street must be a string',
    }),
    addressNumber: z.number({
        required_error: 'Street number is required',
        invalid_type: 'Street number must be a number'
    }),
    floorDepto: z.string().max(5,{
        message : 'Floor must be at most 5 characters long'
    }),
    idPostalCode: z.number({
        required_error: 'Code Postal is required',
        invalid_type: 'Street number must be a number'
    })
})

export const validateAddressClient = (data) =>{
    try{
        const validateAddress = addressSchema.safeParse(data);
        return validateAddress
    }catch(err){
        return{ error: err.error}
    }
}

