const mongoose = require('mongoose');
const Comment = require('./comment.model');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comments: [Comment]
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;