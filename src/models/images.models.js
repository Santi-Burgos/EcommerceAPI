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

    static async editProductImage({images, idProduct, idImgProduct}){
        try{
            const values = images.map(img=>[img.url, img.name, idProduct, idImgProduct])
            console.log(values)
            const changeProductImg = ' UPDATE `imageproduct` SET `urlImgProduct`= ?,`nameImgProduct`=? WHERE idProduct = ? AND idImgProduct=?' 
            
            

             for (const val of values) {
                await connection.query(changeProductImg, val);
            }

            return{
                success: true,
                message: 'Imagenes actualizadas con exito'
            }
            

        }catch(error){
            console.error(error)
            throw new Error('Error al cambiar imagen de perfil' + error.messsage)
        }
    }
}

export default Images