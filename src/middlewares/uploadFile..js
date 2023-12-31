const multer = require('multer');
const {ALLOWED_FILE_TYPES, MAX_FILE_SIZE,  UPLOAD_USER_IMAGE_DIRECTORY, UPLOAD_PRODUCT_IMAGE_DIRECTORY} = require('../config');



const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMAGE_DIRECTORY)
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + '-'+ file.originalname)
  }
})

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PRODUCT_IMAGE_DIRECTORY)
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + '-'+ file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error('File type is not allowed'), false)
  }
  cb(null, true);
}

const upload = multer({
  storage: userStorage,
  limits: {fileSize: MAX_FILE_SIZE},
  fileFilter,
})

const uploadProductStorage = multer({
  storage: productStorage,
  limits: {fileSize: MAX_FILE_SIZE},
  fileFilter,
})
module.exports = {upload, uploadProductStorage};