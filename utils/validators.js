const {
    isEmpty,
    isEmail,
    isLength,
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
                message: `User already exists`,
                inputField: `email`,
            });
            return validationErrors;
        }
        if (isEmpty(name.trim())) {
            validationErrors.push({
                message: `Name is required`,
                inputField: `name`,
            });
        }
        if (!isEmail(normalizeEmail(email))) {
            validationErrors.push({
                message: `Email is required and should be valid email address`,
                inputField: `email`,
            });
        }
        if (!isLength(password.trim(), { min: 6 })) {
            validationErrors.push({
                message: `Password is required and should contains at least 6 characters`,
                inputField: `password`,
            });
        }
        if (!equals(password, passwordConfirm)) {
            validationErrors.push({
                message: `Password doesn't match`,
                inputField: `passwordConfirm`,
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
                message: `Wrong email`,
                inputField: `email`,
            });
            return validationErrors;
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            validationErrors.push({
                message: `Wrong password`,
                inputField: `password`,
            });
        }
        return validationErrors;
    }
};
