const { AuthenticationError } = require('apollo-server-express');
const { User, Pin } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // query all users
    users: async () => {
      return User.find().populate('pins');
    },
    // query a single user by username
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('pins');
    },
    // query all pins
    pins: async () => {
      return Pin.find().populate('pins');
    },
    // query a single pin by classification
    pinsByClassification: async (parent, { pinClassification }) => {
      const params = pinClassification ? { pinClassification } : {};
      return Pin.find(params).sort({ createdAt: -1 });
    },
    // query a single pin by id
    pin: async (parent, { pinId }) => {
      return Pin.findOne({ _id: pinId });
    },
    // query my (user that is logged in) pins
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('pins');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // add / register a new user profile
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // login and authenticate an existing user profile
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
    // add / drop a new pin on the map
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
    // add a new comment on a pin
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

