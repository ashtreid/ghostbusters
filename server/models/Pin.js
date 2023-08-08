const { Schema, model } = require('mongoose');
const Comment = require('./Comment');
const dateFormat = require('../utils/dateFormat');

// Spectral Classifications (type of paranormal sighting)
const allowedClassifications = [
  "Class I",
  "Class II",
  "Class III",
  "Class IV",
  "Class V",
  "Class VI",
  "Class VII",
];

const pinSchema = new Schema({
  pinLat: {
    type: Number,
    required: true,
    // min: -90,
    // max: 90,
  },
  pinLon: {
    type: Number,
    required: true,
    // min: -180,
    // max: 180,
  },
  pinClassification: {
    type: String,
    // required: true,
    enum: allowedClassifications,
  },
  pinTitle: {
    type: String,
    // required: 'You need to leave a title!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  pinText: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  pinAuthor: {
    type: String,
    // required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

  comments: [Comment.schema],
},
  {
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// virtual for comment count on pins
pinSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

const Pin = model('Pin', pinSchema);

module.exports = Pin;

// TODO: Remove the below original comments prior to becominng a subdocument if no longer needed
// comments: [
//     {
//       commentText: {
//         type: String,
//         required: true,
//         minlength: 1,
//         maxlength: 280,
//       },
//       commentAuthor: {
//         type: String,
//         required: true,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//         get: (timestamp) => dateFormat(timestamp),
//       },
//     },
//   ],

  // comments: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Comment',
  //   },
  // ]