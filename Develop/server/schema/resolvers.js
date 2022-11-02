const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('Please login to continue');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            try {
                const user = await User.create(args);

                const token = signToken(user);
                return { token, user };
            } catch (err) {
                console.log(err);
            }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('User not found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Password/username are incorrect');
            }

            const token = signToken(user);

            return { token, user };
        },
       
    },
};

module.exports = resolvers;