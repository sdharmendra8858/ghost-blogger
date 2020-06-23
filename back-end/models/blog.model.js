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
        type: String,
        required: true,
        trim: true
    },
    comments: [Comment]
})

// const Blog = mongoose.model('Blog', {
//     title: {
//         type: String,
//         required: true,
//         trim: true,
//         maxlength: 25
//     },
//     description: {
//         type: String,
//         required: true
//     }
// });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;