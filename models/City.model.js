const {Schema, model} = require('mongoose');

const cityModel = new Schema({
    name: {type: String, required: true},
    value: {type: Number, required: true, unique: true},
    location: {
        lat: {type: Number, required: true},
        long: {type: Number, required: true},
    },
})

module.exports = model("City", cityModel);