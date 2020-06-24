const express = require('express');
const Blog = require('../models/blog.model');
const router = new express.Router();

router.post('/blogs', async(req, res) => {
    const blog = new Blog(req.body);

    try{
        await blog.save();
        res.status(201).send(blog);
    }
    catch(e){
        res.status(400).send(e);
    }
});

router.get('/blogs', async(req, res) => {
    try{
        const blogs = await Blog.find({});
        res.send(blogs);
    }
    catch(e){
        res.status(500).send();
    }
});

router.get('/blogs/:blogId', async(req, res) => {
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

router.patch('/blogs/:blogId', async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "blog"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({"error": "invalid updates1"});
    }

    try{
        const blog = await Blog.findByIdAndUpdate(req.params.blogId, req.body, { new: true, runValidators: true });
    
        if(!blog){
            return res.send(400).end("Blog not found");
        }
    
        res.send(blog);
    }
    catch(e){
        res.send(500).send();
    }

})

router.delete('/blogs/:id', async(req, res) => {
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if(!blog){
            return res.status(404).send({"error": "blog not found!"});
        }

        res.send(blog);
    }
    catch(e){

    }
})

router.post('/blogs/:blogId/comments', async(req, res) => {
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

router.get('/blogs/:blogId/comments', async(req, res) => {
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

router.delete('/blogs/:blogId/comments', async(req, res) => {
    const _id = req.params.blogId;

    try{
        const blog = await Blog.findById(_id);

        if(!blog){
            return res.status(404).send({"error": "blog not found!"});
        }

        if(!blog.comments.length){
            return res.status(400).send({"error": "nothing to delete!"});
        }

        blog.comments = [];

        await blog.save();

        res.send(blog);
    }
    catch(e){
        res.status(500).send();
    }
})

router.post('/blogs/:blogId/comments/:commentId', (req, res) => {
    res.status(403).end('Post operation is not supported on /blogs/' + req.params.blogId + '/comments/' + req.params.commentId);
})

router.get('/blogs/:blogId/comments/:commentId', async(req, res) => {
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

router.patch('/blogs/:blogId/comments/:commentId', async(req, res) => {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;

    const updates = Object.keys(req.body);
    const updateValues = Object.values(req.body);
   
    const allowedUpdates = ["message", "rating"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    const isEmptyValues = updateValues.every((value) => value === "" || value === 0);

    if(!isValidOperation || isEmptyValues){
        return res.status(400).send({"error": "invalid updates"});
    }

    try{
        const blog = await Blog.findById(blogId);
        
        if(!blog){
            return res.status(404).end('Blog not Found!');
        }

        const comment = blog.comments.filter((comment) => comment.id === commentId)[0];

        if(req.body.message){
            if(typeof(req.body.message)!== "string")
                return res.status(400).end({"error": "invalid data!"});
            comment.message = req.body.message;
        }
        if(req.body.rating){
            comment.rating = req.body.rating;
        }

        await blog.save();

        res.send(blog);

    }
    catch(e){
        res.status(500).send();
    }
})

router.delete('/blogs/:blogId/comments/:commentId', async(req, res) => {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;

    try{
        const blog = await Blog.findById(blogId);

        if(!blog){
            return res.status(404).send({"error": "blog not found!"});
        }

        const CommentIndex = blog.comments.findIndex(comment => comment.id === commentId);

        if(CommentIndex === -1){
            return res.status(404).send({"error": "comment not found"});
        }
        
        blog.comments.splice(CommentIndex, 1);

        await blog.save();

        res.send(blog);
    }
    catch(e){
        res.status(500).send();
    }

})

module.exports = router;