import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const __dirname = path.resolve();
const maxSize = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const filter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}

const upload = multer({ 
  storage,
  fileFilter: filter,
  limits: { fileSize: maxSize }
});

export default upload;