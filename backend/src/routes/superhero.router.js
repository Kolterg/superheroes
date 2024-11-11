const superheroController = require('../controllers/superhero.controller');
const superheroMiddleware = require('../middleware/superhero.middleware');

const router = require('express').Router();
const { multer } = require('../middleware/multer');

router.get('/', superheroController.getSuperheroes);
router.get('/:superheroId', superheroMiddleware.checkIsSuperheroPresent, superheroController.getSuperhero);
router.post('/', multer.none(), superheroMiddleware.checkSuperheroValidity, superheroController.createSuperhero);
router.post('/:superheroId', multer.none(), superheroMiddleware.checkIsSuperheroPresent, superheroController.updateSuperhero);
router.delete('/:superheroId', superheroMiddleware.checkIsSuperheroPresent, superheroController.deleteSuperhero);

module.exports = router;