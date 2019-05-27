const {Schema, model} = require('mongoose');

const reserveSchema = new Schema({
    place: {type: Schema.Types.ObjectId, ref: "Place"},
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    startDate: {type: Number, required: true},
    endDate: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    status: {type: String, required: true, enum: ["reserved", "confirmed", "completed"], default: "reserved"}
})

module.exports = model("Reserve", reserveSchema);