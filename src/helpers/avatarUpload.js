
const multer = require('multer');
const path = require('path');

const STATIC_FILES_PATH = 'public/images';

const storage = multer.diskStorage({
  destination: STATIC_FILES_PATH,
  filename: function (req, file, cb) {
    const { ext } = path.parse(file.originalname);
    cb(null, Date.now() + ext);
    }
});

const upload = multer({ storage });

exports.avatarUpload = upload.single('avatar');