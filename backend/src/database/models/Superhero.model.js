const { Schema, model } = require("mongoose");
const { dataBaseTublesEnum } = require("../../constants");

const superheroSchema = new Schema({
        nickname: {
            type: String,
            require: true,
            uniqe: true
        },
        real_name: {
            type: String,
            require: true,
        },
        origin_description: {
            type: String,
            require: true
        },
        superpowers: {
            type: String,
            require: true
        },
        catch_phrase: {
            type: String,
            require: true
        },
        Images: {
            type: [String],
            require: true
        }
});

module.exports = model(dataBaseTublesEnum.SUPERHERO, superheroSchema);