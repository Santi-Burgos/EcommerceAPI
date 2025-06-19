import jwt from 'jsonwebtoken';
import {config as configDotenv} from 'dotenv';

const JWT_SECRET = process.env.JWT_SECRET;

export const tokenGenerate = async(idUser, addressMailUser) =>{
    const tokenCreate = jwt.sign(
        {
            idUser,
            addressMailUser
        },
        JWT_SECRET,
        {expiresIn: '1h'}
    )
    return tokenCreate
}