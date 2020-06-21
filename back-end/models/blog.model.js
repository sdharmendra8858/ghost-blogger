const mongoose = require('mongoose');
const Comments = require('./comment.model');

const Blog = mongoose.model('Blog', {
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = Blog;