import connection from "../config/database.js";
import fs from 'node:fs'
import path from "node:path";
import { fileURLToPath } from "node:url";
import {config as configDotenv} from 'dotenv';

configDotenv();

export async function deleteImageSelect(table, valueSelect, data, idField, extraCondition = {}){
    try{

        const values = [];
        const idValue = data;

        values.push(idValue)

        let whereClause = `\`${idField}\` = ?`;
    
        for(const [key, val] of Object.entries(extraCondition)){
            whereClause += `AND \`${key}\` = ?`;
            values.push(val);
        }
        
        const querySelect = `SELECT \`${valueSelect}\` FROM \`${table}\` WHERE  ${whereClause}`

        const [rows] = await connection.query(querySelect, values)
        
        const uploadsFolder = path.resolve(process.env.PATH_UPLOADS);

        for (const row of rows) {
            const imageUrl = row[valueSelect]; 

            try {
                const urlPath = new URL(imageUrl).pathname; 
                const absolutePath = path.join(uploadsFolder, urlPath);
                
                if (fs.existsSync(absolutePath)) {
                    fs.unlinkSync(absolutePath);
                } 
            } catch (err){
                console.error('Error procesando URL:', imageUrl, err.message);
            }
        }  
        return{
            success: true,
            message: 'images deleted succesfully'
        }
    }catch(error){
        return{
            success: false,
            error: ('Error al eliminar las imagenes' + error.message)
        }
    }
}