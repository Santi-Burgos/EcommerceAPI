import connection from '../config/database.js'

export async function requieredPermission(permission, rolID){
    try{

        console.log('idRol: ',rolID)

        const queryPermissions = 'SELECT rolpermissions.idRol, rolpermissions.idPermissions, `adminpermissions`.permissionsName FROM `rolpermissions` INNER JOIN adminpermissions ON rolpermissions.idPermissions = adminpermissions.idPermissions WHERE idRol = ?'  

        const [rows] = await connection.query(queryPermissions, rolID);

        for(const row of rows){
            if(permission === row){
                console.log('Tienes permiso para realizar esta accion')
                next();
            }else{  
                return res.status(401).json({
                    message: 'Not authorized',
                    details: 'No estas autorizado para realizar esta accion'
                })
            }
        }
    }catch(error){
        return{
            error:('No se ha podido realizar la accion' + error.message)
        }
    }
    
}