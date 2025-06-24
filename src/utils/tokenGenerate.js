import jwt from 'jsonwebtoken';
import {config as configDotenv} from 'dotenv';

const JWT_SECRET = process.env.JWT_SECRET;

export const tokenGenerate = async(idUser, addressMailUser, idRol) =>{
    
    let payload = {idUser, addressMailUser, idRol}

    if(!idRol){
        payload = {idUser, addressMailUser}
    }

    const tokenCreate = jwt.sign(
        payload,
        JWT_SECRET,
        {expiresIn: '1h'}
    )
    return tokenCreate
}