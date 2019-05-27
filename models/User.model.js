const {Schema, model} = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    picture: String,
    phone: String,
    places: [{type: Schema.Types.ObjectId, ref: "Place"}],
    reserves: [{type: Schema.Types.ObjectId, ref: "Reserve"}],
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
    googleId: String,
    password: String,
})

userSchema.statics.createJWT = function(user) {
    return 'Bearer ' + jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRATION_TIME})
}

module.exports = model("User", userSchema);