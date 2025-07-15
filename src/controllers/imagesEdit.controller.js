import { mapUploadedImages } from "../helper/imageArray.helper.js";
import Images from "../models/images.models.js";



export const editProfileImageController = async(req) =>{

   try{ 
        const clientID = req.user.idUser
        
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

export const editProductImgController = async(req) =>{
    try{
        const {idProduct, idImgProduct} = req.body 
        const images = await mapUploadedImages(req.files); 
        
        const allToUpdate = {images, idProduct, idImgProduct}

        const editImagesProduct = await Images.editProductImage(allToUpdate)
        return{
            success: true,
            data:editImagesProduct
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