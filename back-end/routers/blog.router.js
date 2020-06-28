const express = require('express');
const auth = require('../middleware/auth.middleware');
const Blog = require('../models/blog.model');
const router = new express.Router();

router.post('/blogs', auth, async(req, res) => {
    const blog = new Blog({
        ...req.body,
        author: req.user._id
    })

    try{
        await blog.populate('author').execPopulate();
        await blog.save();
        res.status(201).send(blog);
    }
    catch(e){
        res.status(400).send(e);
    }
});

//localhost:3000/blogs?limit=2&skip=2&sortBy=createdAt:desc


router.get('/blogs', async(req, res) => {

    const sort = {};
    
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':');
        sort[part[0]] = part[1] === "desc" ? -1 : 1;
    }

    try{
        const blogs = await Blog.find({})
                        .limit(parseInt (req.query.limit))
                        .skip(parseInt(req.query.skip))
                        .sort(sort)
                        .populate('author')
                        .populate('comments.author');
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
                        .populate('author')
                        .populate('comments.author');
        if(!blog){
            return res.status(404).send();
        }

        res.send(blog);
    }
    catch(e){
        res.status(500).send();
    }
});

router.patch('/blogs/:blogId', auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "blog"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({"error": "invalid updates1"});
    }

    try{
        const blog = await Blog.findOne({_id: req.params.blogId, author: req.user._id})
                        .populate('author')
                        .populate('comments.author');
    
        if(!blog){
            return res.send(404).end("Blog not found");
        }

        updates.forEach((update) => blog[update] = req.body[update]);
        await blog.save();
    
        res.send(blog);
    }
    catch(e){
        res.send(500).send();
    }

})

router.delete('/blogs/:blogId', auth, async(req, res) => {
    try{
        const blog = await Blog.findOneAndDelete({_id: req.params.blogId, author: req.user._id})
                        .populate('author')
                        .populate('comments.author');

        if(!blog){
            return res.status(404).send({"error": "blog not found!"});
        }

        res.send(blog);
    }
    catch(e){
        res.status(500).send();
    }
})

//////////////////////////

//  blog comments

//////////////////////////

router.post('/blogs/:blogId/comments', auth, async(req, res) => {
    const _id = req.params.blogId;
    try{
        const blog = await Blog.findById(_id);

        if(!blog){
            return res.status(404).send();
        }

        blog.comments.push({...req.body, author: req.user._id});
        await blog.populate('author').populate('comments.author').execPopulate();
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
        const blog = await Blog.findById(_id)
                        .populate('comments.author');
        if(!blog){
            return res.status(404).end('Blog not found!');
        }

        res.send(blog.comments);
    }
    catch(e){
        res.status(500).send();
    }
})

router.delete('/blogs/:blogId/comments', auth, async(req, res) => {
    const _id = req.params.blogId;

    try{
        const blog = await Blog.findOne({_id, author: req.user._id})
                        .populate('author');

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

//////////////////////////

// single comment

//////////////////////////

router.post('/blogs/:blogId/comments/:commentId', auth, (req, res) => {
    res.status(403).end('Post operation is not supported on /blogs/' + req.params.blogId + '/comments/' + req.params.commentId);
})

router.get('/blogs/:blogId/comments/:commentId', async(req, res) => {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;

    try{
        const blog = await Blog.findById(blogId)
                        .populate('comments.author');
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

router.patch('/blogs/:blogId/comments/:commentId', auth, async(req, res) => {
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
        const blog = await Blog.findById(blogId)
                    .populate('author')
                    .populate('comments.author');
        
        if(!blog){
            return res.status(404).end('Blog not Found!');
        }

        const comment = blog.comments.filter((comment) => comment.id === commentId)[0];

        if(!comment){
            return res.status(404).end('Comment not found!');
        }

        if(JSON.stringify(comment.author) !== JSON.stringify(req.user._id)){
            
            return res.status(401).send();
        }

        updates.forEach((update) => comment[update] = req.body[update]);

        await blog.save();

        res.send(blog);

    }
    catch(e){
        res.status(500).send();
    }
})

router.delete('/blogs/:blogId/comments/:commentId', auth, async(req, res) => {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;

    try{
        const blog = await Blog.findById(blogId)
                    .populate('author')
                    .populate('comments.author');

        if(!blog){
            return res.status(404).send({"error": "blog not found!"});
        }

        const comment = blog.comments.id(commentId);

        if(!comment){
            return res.status(404).send({"error": "comment not found!"});
        }

        if(JSON.stringify(comment.author) !== JSON.stringify(req.user._id)){
            return res.status(401).send();
        }
        
        comment.remove();
        await blog.save();

        res.send(blog);
    }
    catch(e){
        res.status(500).send();
    }

})

module.exports = router;