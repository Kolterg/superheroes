const imageController = require('../controllers/image.controller');
const { multer } = require('../middleware/multer');
const superheroMiddleware = require('../middleware/superhero.middleware');

const router = require('express').Router();

router.put('/:superheroId', superheroMiddleware.checkIsSuperheroPresent, multer.array('images[]'), imageController.postImage);
router.delete('/:superheroId/:imageName', superheroMiddleware.checkIsSuperheroPresent, imageController.deleteImage);

module.exports = router;