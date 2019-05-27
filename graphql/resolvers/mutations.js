const {UserInputError, AuthenticationError, ForbiddenError} = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const City = require('../../models/City.model');
const Place = require('../../models/Place.model');
const Reserve = require('../../models/Reserve.model');
const Review = require('../../models/Review.model');
const User = require('../../models/User.model');
const {registerUserValidator, loginUserValidator, createPlaceValidator} = require('../../utils/validators');

module.exports = {
    registerUser: async (parent, args, ctx, info) => {
        const {password, passwordConfirm, ...restUserData} = args;
        const validationErrors = await registerUserValidator(args);
        if (validationErrors.length) {
            throw new UserInputError(`Validation failed`, {
                errorList: validationErrors,
            });
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
            });
        }
        const user = await User.findOne({email}).exec();
        const token = User.createJWT(user);
        return {user, token};
    },
    updateUser: async (parent, args, ctx, info) => {
        if (!ctx.currentUser) {
            throw new AuthenticationError('User is not authenticated');
        }
        const updatedUser = await User.findOneAndUpdate({_id: ctx.currentUser._id}, {$set: {...args}}, {new: true});
        return updatedUser;
    },
    createPlace: async (parent, {input}, ctx) => {
        if (!ctx.currentUser) {
            throw new AuthenticationError('User is not authenticated');
        }
        const validationErrors = await createPlaceValidator(input);
        if (validationErrors.length) {
            throw new UserInputError(`Validation failed`, {
                errorList: validationErrors,
            });
        }
        console.log;
        const place = await new Place({
            ...input,
            owner: ctx.currentUser._id,
        }).save();
        await Place.populate(place, {path: 'owner'});
        await Place.populate(place, {path: 'city'});
        return place;
    },
    updatePlace: async (parent, {input}, ctx) => {
        if (!ctx.currentUser) {
            throw new AuthenticationError('User is not authenticated');
        }
        const place = await Place.findById(input._id).exec();
        if (!place) {
            throw new UserInputError('Place with the id is absent');
        }
        if (place.owner !== ctx.currentUser._id) {
            throw new ForbiddenError('User has no permission to update this place');
        }
        const updatedPlace = await Place.findByIdAndUpdate({_id: input._id}, {$set: {...input}}, {new: true})
            .populate('owner')
            .populate('city')
            .populate('reviews')
            .populate('reserves');
        return updatedPlace;
    },
    deletePlace: async (parent, {id}, ctx) => {
        if (!ctx.currentUser) {
            throw new AuthenticationError('User is not authenticated');
        }
        const place = await Place.findById(id).exec();
        if (!place) {
            throw new UserInputError('Place with the id is absent');
        }
        if (place.owner !== ctx.currentUser._id) {
            throw new ForbiddenError('User has no permission to update this place');
        }
        await Place.findByIdAndDelete(id);
        return id;
    },
   
};
