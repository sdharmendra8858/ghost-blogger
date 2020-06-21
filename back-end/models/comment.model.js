const mongoose = require('mongoose');

const Comment = mongoose.model('Comment',{
    author: {
        type: String,
        trim: true,
        required:true
    },
    rating: {
        type: Number,
        max: 5,
        default: 5,
        min: 0,
        required: true
    },
    message: {
        type: String,
        trim: true
    }
});

module.exports = Comment;