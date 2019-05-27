const {UserInputError, AuthenticationError} = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const City = require('../../models/City.model');
const Place = require('../../models/Place.model');
const Reserve = require('../../models/Reserve.model');
const Review = require('../../models/Review.model');
const User = require('../../models/User.model');
const {registerUserValidator, loginUserValidator} = require('../../utils/validators');

module.exports = {
    registerUser: async (parent, args, ctx, info) => {
        const {password, passwordConfirm, ...restUserData} = args;
        const validationErrors = await registerUserValidator(args);
        if (validationErrors.length) {
            throw new UserInputError(`Validation failed`, {
                errorList: validationErrors,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            ...restUserData,
            password: hashedPassword,
        }).save();
        const token = User.createJWT(user);
        return {user, token};
    },
    loginUser: async (parent, args, ctx, info) => {
        const {email, googleId} = args;
        const validationErrors = await loginUserValidator(args);
        if (validationErrors.length) {
            throw new UserInputError(`Validation failed`, {
                errorList: validationErrors,
            })
        }
        const user = await User.findOne({email}).exec();
        const token = User.createJWT(user);
        return {user, token};
    },
    updateUser: async (parent, args, ctx, info) => {
        if (!ctx.currentUser) {
            throw new AuthenticationError('User is not authenticated')
        }
        const updatedUser = await User.findOneAndUpdate(
            {_id: ctx.currentUser._id},
            {$set: {...args}},
            {new: true}
        )
        return updatedUser;
    },
};
