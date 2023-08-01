const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');



const pinSchema = new Schema({
  pinLocation: {
    type: String,
    // TODO: What kind of properties do we need to define for the location? How will it work with the map?
  },
  pinTitle: {
    type: String,
    required: 'You need to leave a title!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  pinText: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  pinAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Pin = model('Pin', pinSchema);

module.exports = Pin;
