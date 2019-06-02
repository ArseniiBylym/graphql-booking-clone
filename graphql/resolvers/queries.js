const {AuthenticationError, ForbiddenError} = require('apollo-server-express');
const User = require('../../models/User.model');
const Place = require('../../models/Place.model');
const Reserve = require('../../models/Reserve.model');
const City = require('../../models/City.model');

module.exports = {
    me: async (parent, args, ctx) => {
        if(!ctx.currentUser) {
            throw new AuthenticationError('Permission denied');
        }
        const user = await User.findById(ctx.currentUser._id).exec();
        return user
    },
    getUser: async (parent, {id}, ctx) => {
        const user = await User.findById(id)
            .populate('places')
            .populate('reviews')
            .populate('reserves')
            .exec();
        if (!user) {
            throw new ForbiddenError('User not found');
        }
        if (!ctx.currentUser || ctx.currentUser._id !== id){
            delete user.reserves;
            delete user.googleId;
        }
        return user;
    },
    getPlace: async (parent, {id}, ctx) => {
        const place = await Place.findById(id)
            .populate('city')
            .populate('owner')
            .populate({
                path: 'reviews',
                populate: {path: 'owner'}
            })
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
        console.log('Places list', places);
        return places;
    },
    getUserReserves: async(parent, args, ctx) => {
        const {page, limit, sort, order} = args;
        if(!ctx.currentUser) {
            throw new AuthenticationError('Permission denied');
        }
        const reserves = await Reserve.find({owner: ctx.currentUser._id})
            .populate('place')
            .populate('owner')
            .exec();
        return reserves;
    },
    getPlaceReserves: async(parent, args, ctx) => {
        const {placeId, page, limit, sort, order} = args;
        if(!ctx.currentUser) {
            throw new AuthenticationError('Permission denied');
        }
        const place = await Place.findById(placeId).exec();
        if (place.owner !== ctx.currentUser._id) {
            throw new AuthenticationError('Permission denied');
        }
        const reserves = await Reserve.find({place: placeId})
            .populate('place')
            .populate('owner')
            .exec();
        return reserves;
    },
    getCities: async() => {
        const cities = await City.find().exec();
        return cities;
    },
    checkDates: async(parent, args, ctx) => {
        const {placeId, startDate, endDate} = args;
        const reserves = await Reserve.find({place: placeId}).exec();
        const existedReserve = reserves.find(item => {
            if (Number(item.startDate) <= Number(startDate) && Number(item.endDate) >= Number(startDate)) {
                return true;
            }
            if (Number(item.startDate) <= Number(endDate) && Number(item.endDate) >= Number(endDate)) {
                return true;
            }
            return false;
        })
        return existedReserve ? 'reserved' : 'available';
    } 
}