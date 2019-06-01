const {
    isEmpty,
    isEmail,
    isLength,
    isInt,
    isFloat,
    equals,
    normalizeEmail,
} = require('validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

module.exports = {
    registerUserValidator: async data => {
        let validationErrors = [];
        const { name, email, password, passwordConfirm, googleId } = data;
        if (googleId) return validationErrors;
        const user = await User.findOne({email}).exec();
        if (user) {
            validationErrors.push({
                email: `User already exists`,
            });
            return validationErrors;
        }
        if (isEmpty(name.trim())) {
            validationErrors.push({
                name: `Name is required`,
            });
        }
        if (!isEmail(normalizeEmail(email))) {
            validationErrors.push({
                email: `Email is required and should be valid email address`,
            });
        }
        if (!isLength(password.trim(), { min: 6 })) {
            validationErrors.push({
                password: `Password is required and should contains at least 6 characters`,
            });
        }
        if (!equals(password, passwordConfirm)) {
            validationErrors.push({
                passwordConfirm: `Password doesn't match`,
            });
        }
        return validationErrors;
    },
    loginUserValidator: async data => {
        let validationErrors = [];
        const {email, password, googleId } = data;
        const user = await User.findOne({email}).exec();
        if (!user) {
            validationErrors.push({
                email: `Wrong email`,
            });
            return validationErrors;
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            validationErrors.push({
                password: `Wrong password`,
            });
        }
        return validationErrors;
    },
    createPlaceValidator: async data => {
        let validationErrors = [];
        const {name, address, city, price } = data;
        if (isEmpty(name.trim())) {
            validationErrors.push({
                message: `Name is required`,
                inputField: `name`,
            });
        }
        if (isEmpty(address.trim())) {
            validationErrors.push({
                message: `Address is required`,
                inputField: `address`,
            });
        }
        if (isEmpty(String(city))) {
            validationErrors.push({
                message: `City is required`,
                inputField: `city`,
            });
        }
        if (!isFloat(String(price))) {
            validationErrors.push({
                message: `Price is required`,
                inputField: `price`,
            });
        }
        return validationErrors;
    }
};
