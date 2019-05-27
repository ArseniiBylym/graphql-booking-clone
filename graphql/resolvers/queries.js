const {AuthenticationError} = require('apollo-server-express');
const User = require('../../models/User.model');

module.exports = {
    me: async (parent, args, ctx) => {
        if(!ctx.currentUser) {
            throw new AuthenticationError('Permission denied');
        }
        const user = await User.findById(ctx.currentUser._id).exec();
        return user
    },
}