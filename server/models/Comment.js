const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
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
    // refto the pin this comment belongs to
    pinId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Pin', 
        required: true 
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;