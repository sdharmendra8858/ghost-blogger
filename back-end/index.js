const express = require('express');
require('./db/mongoose');
const User = require('./models/user.model');
const Blog = require('./models/blog.model');
const { Mongoose } = require('mongoose');
const { __await } = require('tslib');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', async(req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        res.status(201).send(user);
    }
    catch(e){
        res.status(400).send(e);
    }
});

app.get('/users', async(req, res) => {

    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(e){
        res.status(500).send(e)
    }
});

app.get('/users/:id', async(req, res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }
    catch(e){
        res.status(500).send();
    }

})

app.post('/blogs', async(req, res) => {
    const blog = new Blog(req.body);

    try{
        await blog.save();
        res.status(201).send(blog);
    }
    catch(e){
        res.status(400).send(e);
    }
});

app.get('/blogs', async(req, res) => {
    try{
        const blogs = await Blog.find({});
        res.send(blogs);
    }
    catch(e){
        res.status(500).send();
    }
});

app.get('/blogs/:blogId', async(req, res) => {
    const _id = req.params.blogId;
    try{
        const blog = await Blog.findById(_id)
        if(!blog){
            return res.status(404).send();
        }

        res.send(blog);
    }
    catch(e){
        res.status(500).send();
    }
});

app.post('/blogs/:blogId/comments', async(req, res) => {
    const _id = req.params.blogId;
    try{
        const blog = await Blog.findById(_id);

        if(!blog){
            return res.status(404).send();
        }

        blog.comments.push(req.body);
        await blog.save();
        res.status(201).send(blog);
    }
    catch(e){
        res.status(500).send()
    }
})

app.get('/blogs/:blogId/comments', async(req, res) => {
    const _id = req.params.blogId;
    try{
        const blog = await Blog.findById(_id);
        if(!blog){
            return res.status(404).end('Blog not found!');
        }

        res.send(blog.comments);
    }
    catch(e){
        res.status(500).send();
    }
})

app.post('/blogs/:blogId/comments/:commentId', (req, res) => {
    res.status(403).end('Post operation is not supported on /blogs/' + req.params.blogId + '/comments/' + req.params.commentId);
})

app.get('/blogs/:blogId/comments/:commentId', async(req, res) => {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;

    try{
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).end('Blog not found');
        }

        const comment = blog.comments.filter((comment) => comment.id === commentId)[0];

        if(!comment){
            return res.status(404).end('Comment not found!');
        }

        res.send(comment);

    }
    catch(e){
        res.status(500).send();
    }
})

app.listen(port, () => {
    console.log('Server running on port '+ port);
    
})