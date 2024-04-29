import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'node:path';

// Configuração de armazenamento para o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20971520 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false);
    }
  },
});

export default upload;
