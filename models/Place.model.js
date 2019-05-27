const {Schema, model} = require('mongoose');

const placeSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: Schema.Types.ObjectId, ref: "City"},
    location: {
        lat: {type: Number, required: true},
        long: {type: Number, required: true},
    },
    details: String,
    roomsNumber: {type: Number, required: true, default: 1},
    mainImage: {type: String, required: true},
    secondaryImages: [String],
    price: {type: Number, required: true},
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
    rating: Number,
    reserves: [{type: Schema.Types.ObjectId, ref: "Reserve"}],
})

module.exports = model("Place", placeSchema);