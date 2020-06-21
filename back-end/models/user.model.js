const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 6){
                throw new Error('Password must be more than 6 characters')
            }

            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    age: {
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error('Age cannot be a negative number');
            }
        }
    }
});

module.exports = User;