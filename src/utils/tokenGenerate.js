import jwt from 'jsonwebtoken';
import {config as configDotenv} from 'dotenv';
import {cookies} from './cookies.js'

const JWT_SECRET = process.env.JWT_SECRET;

export const tokenGenerate = async(idUser, addressMailUser) =>{
    const tokenCreate = jwt.sing(
        {
            idUser,
            addressMailUser
        },
        JWT_SECRET,
        {expireIn: '1h'},
        cookies
    )
    return tokenCreate
}