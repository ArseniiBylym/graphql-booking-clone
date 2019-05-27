const {AuthenticationError} = require('apollo-server-express');
const User = require('../../models/User.model');
const Place = require('../../models/Place.model');

module.exports = {
    me: async (parent, args, ctx) => {
        if(!ctx.currentUser) {
            throw new AuthenticationError('Permission denied');
        }
        const user = await User.findById(ctx.currentUser._id).exec();
        return user
    },
    getPlace: async (parent, {id}, ctx) => {
        const place = await Place.findById(id)
            .populate('city')
            .populate('owner')
            .populate('reviews')
            .populate('reviews.owner')
            .exec();
        if (!place) {
            throw new ForbiddenError('Place with the id is absent');
        }
        return place;
    },
    getPlaces: async (parent, args, ctx) => {
        const {city, page, limit, sort, order} = args;
        const places = await Place.find({city})
            .populate('city')
            .populate('owner')
            .populate('reviews')
            .populate('reviews.owner')
            .exec();
        return places;
    },
}