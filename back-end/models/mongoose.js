const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    dateofBirth: {
        type: Number
    }
});

const user = new User({
    name: 'ghost',
    dateofBirth: 23
});

user.save().then(() => {
    console.log(user);
    
}).catch((error) => {
    console.log('Error', error);
    
})