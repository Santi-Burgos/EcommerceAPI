import multer from "multer";
import path from 'path';
import fs from 'fs';

const storage  = multer.diskStorage({
    destination: (req, file, cb)=>{

        let uploadDir = "uploads/"

        if (req.isMultiple) {
            uploadDir += "products/";
        } else {
            uploadDir += "profile/";
        }
    
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) =>{
    const fileType = /jpg|jgpe|png|jfif/;
    const extName = fileType.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimeType = fileType.test(file.mimeType);

    if(extName && mimeType){
        return cb(null, true);
    } else {
        return cb(new Error)
    }
};

export const upload = multer({
    storage,
    limits: {fileSize: 5000000},
    fileFilter,
})