import multer from "multer";
import path from 'path';
import fs from 'fs';

const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadDir = path.join(process.cwd(), 'src','uploads');

        if (req.isMultiple) {
            uploadDir = path.join(uploadDir, 'products');
        } else {
            uploadDir = path.join(uploadDir, 'profile');
        }

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
  const fileType = /jpg|jpeg|png|jfif/;
  const extName = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true); 
  } else {
    cb(new Error('Solo se permiten archivos jpg, jpeg, png o jfif'), false); 
  }
};

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter,
});
