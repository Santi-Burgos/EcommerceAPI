import Images from "../models/images.models.js";


export const editProfileImage = async(req) =>{

   try{ 
        const clientID = req.user.idUser

        console.log(req.file)
        
        const imgName = req.file ? req.file.filename : null;
        const imgUrl = req.file ? `http://localhost/upload/profile/${req.file.filename}` : null;

        const editProfile = await Images.editProfileImage(imgName, imgUrl, clientID)
        return{
            success: true,
            data: editProfile
        }
    }catch(err){
        return{
            success: false,
            error: {
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
    }
    }


}