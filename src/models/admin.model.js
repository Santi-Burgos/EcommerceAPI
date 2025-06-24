import connection from "../config/database.js";

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
}
export default Admin