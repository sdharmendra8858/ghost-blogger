const express = require('express');
require('./db/mongoose');
const User = require('./models/user.model');
const Blog = require('./models/blog.model');
const { Mongoose } = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => res.status(400).send(error));
});

app.get('/users', (req, res) => {
    User.find({}).then((user) => {
        res.send(user);
    }).catch((error) => res.status(500).send())
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((user) => {
        if(!user){
            return res.send(404).send();
        }

        res.send(user);
    }).catch((error) => {
        res.status(500).send();
    })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then(() => {
        res.status(201).send(blog);
    }).catch((error) => res.status(400).send(error));
});

app.get('/blogs', (req, res) => {
    Blog.find({}).then((blogs) => {
        res.send(blogs);
    }).catch((error) => res.status(500).send())
});

app.get('/blogs/:id', (req, res) => {
    const _id = req.params.id;
    Blog.findById(_id).then((blog) => {
        if(!blog){
            return res.status(404).send()
        }

        res.send(blog);
    }).catch((error) => res.status(500).send())
})

app.listen(port, () => {
    console.log('Server running on port '+ port);
    
})