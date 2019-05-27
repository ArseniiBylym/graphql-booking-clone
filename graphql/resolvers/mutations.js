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
    createReserve: async(parent, {input}, ctx) => {
        const {placeId, statDate, endDate} = input;
        if (!ctx.currentUser) {
            throw new AuthenticationError('User is not authenticated');
        }
        const place = await Place.findById(placeId).exec();
        if (!place) {
            throw new UserInputError('Place with the id is absent');
        }
        const totalDays = (+endDate - +startDate) / (1000 * 60 * 60 * 24);
        const totalPrice = (+place.price * totalDays).toFixed(2);
        const reserve = await new Reserve({
            ...input,
            owner: ctx.currentUser._id,
            totalPrice,
        }).save();
        await Place.findByIdAndUpdate(placeId, {$push: {reserves: reserve._id}});
        await Reserve.populate(reserve, 'place')
        await Reserve.populate(reserve, 'owner')
        return reserve;
    },
    updateReserveStatus: async(parent, args, ctx) => {
        const {reserveId, status} = args;
        if (!ctx.currentUser) {
            throw new AuthenticationError('User is not authenticated');
        }
        const reserve = await Reserve.findById(reserveId).populate('place').populate('owner').exec();
        if (reserve.place.owner !== ctx.currentUser._id) {
            throw new ForbiddenError('User has no permission to update this reserve status');
        }
        reserve.status = status; 
        await reserve.save();
        return reserve;
    },
    createReview: async(parent, args, ctx) => {
        if (!ctx.currentUser) {
            throw new AuthenticationError('User is not authenticated');
        }
        const {placeId, grade, text} = args;
        const review = await new Review({
            ...args,
            owner: ctx.currentUser._id,
            date: Date.now(),
        }).save();
        await Place.findByIdAndUpdate(placeId, {$push: {reviews: review._id}});
        return review;
    },
    updateReview: async(parent, args, ctx) => {
        if (!ctx.currentUser) {
            throw new AuthenticationError('User is not authenticated');
        }
        const {reviewId, grade, text} = args;
        const review = await Review.findById(reviewId).exec();
        if (review.owner !== ctx.currentUser._id) {
            throw new ForbiddenError('User has no permission to update this review');
        }
        review.grade = grade || review.grade;
        review.text = text || review.text;
        review.date = Date.now();
        await review.save();
        await Review.populate(review, 'owner');
        await Review.populate(review, 'place');
        return review;
    },
};
