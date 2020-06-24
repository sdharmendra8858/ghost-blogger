const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    author: {
        type: String,
        trim: true,
        required:true
    },
    rating: {
        type: Number,
        max: 5,
        default: 5,
        min: 1,
        required: true
    },
    message: {
        type: String,
        trim: true
    }
});

module.exports = comment;