const { SuperheroModel } = require("../database/models");
const superheroValidator = require("../validators/superhero.validator");

module.exports = {
    checkIsSuperheroPresent: async (req, res, next) => {
        try {
            const { superheroId } = req.params;

            const superhero = await SuperheroModel.findById(superheroId);

            if (!superhero) {
                throw new Error('Superhero not found!');
            }

            req.superheroById = superhero;
            req.superheroId = superheroId;

            next();
        } catch (error) {
            next(error);
        }
    },

    checkSuperheroValidity: async (req, res, next) => {
        try {
            const { error } = superheroValidator.createSuperhero.validate(req.body);
            
            if (error) {
                console.log(error.details);
                throw new Error(error.details[0].message);
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}