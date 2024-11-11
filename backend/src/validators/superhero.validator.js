const Joi = require("joi");

const validator = (schema) => (payload) =>
    schema.validator(payload, {abortEarly: false});

module.exports = {
    createSuperhero: Joi.object().keys({
        nickname: Joi.string().required(),
        real_name: Joi.string().required(),
        origin_description: Joi.string().required(),
        superpowers: Joi.string().required(),
        catch_phrase: Joi.string().required(),
    })
};