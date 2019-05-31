const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    place: {type: Schema.Types.ObjectId, ref: "Place"},
    rating: Number,
    text: {type: String, required: true},
    date: {type: String, required: true}, 
})

module.exports = model("Review", reviewSchema);