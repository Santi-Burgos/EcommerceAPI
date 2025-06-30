import connection from "../config/database.js";
import { buildDynamicUpdateQuery } from "../helper/dinamicQuery.helper.js";

class Admin{
    static async createAdminAccount ({adminName, adminAddressMail, passwordAdminHashed, idRol}){
        try{
            const createAdmin = 'INSERT INTO `useradmin`(`adminName`, `adminAddressMail`, `passwordAdmin`, `idRol`) VALUES (?,?,?,?)'
            const resultCreateAdmin = await connection.query(createAdmin, [adminName, adminAddressMail, passwordAdminHashed, idRol])

            return{
                success: true,
                data: resultCreateAdmin
            }

        }catch(error){
            throw new Error('Error al crear user admin' + error.message)
        }
    }

    static async editAdminAccount(adminToEdit, adminID){
        try{
            const fullDataToUpdate = {...adminToEdit, idAdmin: adminID}
            const {query, values} = buildDynamicUpdateQuery('useradmin', fullDataToUpdate, 'idAdmin');
            const result = await connection.query(query, values);
            return{
                success: true,
                data: result
            }
        }catch(error){
            throw new Error('Error al editar administrador' + error.message)
        }
    }

    static async deleteAdminAccount(adminID){
        try{
            const queryToDelete = 'DELETE FROM `useradmin` WHERE idAdmin = ?'
            const resultDelete = await connection.query(queryToDelete, adminID);
            return{
                success: true, 
                data: resultDelete
            }

        }catch(error){
            throw new Error ('Error al elimnar adminsitrador' + error.message)
        }
    }
}
export default Admin