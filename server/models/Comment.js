const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
    // TODO: (delete this if not needed?) ref to the pinId this comment belongs to
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
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;