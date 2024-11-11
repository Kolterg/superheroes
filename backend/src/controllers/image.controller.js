const fs = require('fs/promises');
const path = require('path');
const { SuperheroModel } = require('../database/models');
const { uploadDir } = require('../middleware/multer');

module.exports = {
    postImage: async (req, res, next) => {
        try {
            const imagesNames = req.files.map(v => v.filename)

            await SuperheroModel.updateOne({ _id: req.superheroId }, { Images: [...req.superheroById.Images, ...imagesNames] });

            res.json(imagesNames);
        } catch (error) {
            next(error);
        }
    },

    deleteImage: async (req, res, next) => {
        try {
            await SuperheroModel.updateOne({ _id: req.superheroId }, { Images: req.superheroById.Images.filter(name => name !== req.params.imageName) });

            await fs.unlink(path.join(uploadDir, req.params.imageName));

            res.status(203);
        } catch (error) {
            next(error);
        }
    }
}