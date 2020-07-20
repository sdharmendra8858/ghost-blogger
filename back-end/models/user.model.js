const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Blog  = require('../models/blog.model');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
    gender: {
        type: String,
        required: true,
        default: 'male'
    },
    dateofBirth: {
        type: Date,
        required: true,
        min: '1980-01-01',
        max: Date.now()
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
{
    timestamps: true
});

userSchema.virtual('blogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    // delete userObject.avatar;

    return userObject;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET_KEY, {expiresIn: '1 days'}); //expires in 60 sec for trial

    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;

}

userSchema.statics.findByCredential = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('Unable to Login!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to Login!');
    }

    return user;
}

userSchema.pre('save', async function(next){

    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

userSchema.pre('remove', async function(next){
    const user = this;
    await Blog.deleteMany({author: user._id});
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;