const { default: mongoose } = require('mongoose');
const { constants } = require('../constants');

module.exports = function _mongooseConnector() {
    mongoose.connect(constants.DB_CONECTION_URL)
};