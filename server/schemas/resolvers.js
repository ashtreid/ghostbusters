const { AuthenticationError } = require('apollo-server-express');
const { User, Pin } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('pins');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('pins');
    },
    pins: async () => {
      return Pin.find().populate('pins');
    },
    pinsByClassification: async (parent, { pinClassification }) => {
      const params = pinClassification ? { pinClassification } : {};
      return Pin.find(params).sort({ createdAt: -1 });
    },
    pin: async (parent, { pinId }) => {
      return Pin.findOne({ _id: pinId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('pins');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user exists with the provided email address!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPin: async (parent, { pinLat, pinLon, pinClassification, pinTitle, pinText }, context) => {
      if (context.user) {
        const pin = await Pin.create({
          pinLat,
          pinLon,
          pinClassification,
          pinTitle,
          pinText,
          pinAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pins: pin._id } }
        );

        return pin;
      }
      throw new AuthenticationError('You must log in to add a new pin!');
    },
    removePin: async (parent, { pinId }, context) => {
      if (context.user) {
        const pin = await Pin.findOneAndDelete({
          _id: pinId,
          pinAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pins: pin._id } }
        );

        return pin;
      }
      throw new AuthenticationError('You must log in to delete a pin!');
    },
    
    addComment: async (parent, { pinId, commentText }, context) => {
      if (context.user) {
        return Pin.findOneAndUpdate(
          { _id: pinId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You must log in to add a comment!');
    },
    removeComment: async (parent, { pinId, commentId }, context) => {
      if (context.user) {
        return Pin.findOneAndUpdate(
          { _id: pinId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You must log in to delete a comment!');
    },
  },
};

module.exports = resolvers;

