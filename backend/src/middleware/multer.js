const multer = require('multer');
const path = require('path');

const uploadDir = path.join(path.dirname(require.main.filename), 'uploads');

const storage = multer.diskStorage({destination: 'uploads/', filename: (req, file, next) => {
    next(null, Date.now() + path.extname(file.originalname))
}});

module.exports = {
    multer: multer({storage}),
    uploadDir: uploadDir
};