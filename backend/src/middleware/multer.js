const multer = require('multer');
const path = require('path');
const fsp = require('fs/promises');

const uploadDir = path.join(path.dirname(require.main.filename), 'uploads');

const storage = multer.diskStorage({
    destination: async (_, __, next) => {
        await fsp.mkdir(uploadDir, { recursive: true }).catch(e => {
            if (e.code !== 'EEXIST') {
                throw e;
            }
        });
        next(null, uploadDir);
    }, filename: (req, file, next) => {
        next(null, Date.now() + path.extname(file.originalname));
    }
});

module.exports = {
    multer: multer({ storage }),
    uploadDir: uploadDir
};