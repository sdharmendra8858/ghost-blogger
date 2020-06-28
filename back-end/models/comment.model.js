const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
},
{
    timestamps: true
});

module.exports = comment;