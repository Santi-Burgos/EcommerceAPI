import connection from "../config/database.js";

class Images {
    static async editProfileImage(imgUrl, imgName, clientID){
        try{
            const changeProfileimg = 'UPDATE `imageclient` SET `imgUrl`=?,`imgName`=? WHERE idClient = ?'
            const queryChangeProfileImg = await connection.query(changeProfileimg, [imgUrl, imgName, clientID])
            return{
                success: true,
                data: queryChangeProfileImg
            }
        }catch(error){
            console.error(error)
            throw new Error('Error al cambiar imagen de perfil' + error.messsage)
        }
    }
}

export default Images