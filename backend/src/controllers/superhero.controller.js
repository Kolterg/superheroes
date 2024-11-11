const { SuperheroModel } = require('../database/models');
const fs = require('fs/promises')
const path = require('path');
const { uploadDir } = require('../middleware/multer');

module.exports = {
    getSuperheroes: async (req, res, next) => {
        try {
            const superheroes = await SuperheroModel.find({});

            res.json(superheroes);
        } catch (error) {
            next(error);
        }
    },

    getSuperhero: async (req, res, next) => {
        try {
            const superhero = req.superheroById;

            res.json(superhero);
        } catch (error) {
            next(error);
        }
    },

    createSuperhero: async (req, res, next) => {
        try {
            const createdSuperhero = await SuperheroModel.create(req.body);

            res.status(201).json(createdSuperhero);
        } catch (error) {
            next(error);
        }
    },

    updateSuperhero: async (req, res, next) => {
        try {
            const updatedSuperhero = await SuperheroModel.findByIdAndUpdate(req.superheroId, req.body);

            res.status(201).json(updatedSuperhero);
        } catch (error) {
            next(error);
        }
    },

    deleteSuperhero: async (req, res, next) => {
        try {
            const deletedSuperhero = await SuperheroModel.findByIdAndDelete(req.superheroId);
            for (let i = 0; i < deletedSuperhero.Images.length; i++) {
                await fs.unlink(path.join(uploadDir, deletedSuperhero.Images[i]));
            }

            res.status(200).json(deletedSuperhero);
        } catch (error) {
            next(error);
        }
    }
}