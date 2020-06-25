const express = require('express');
const auth = require('../middleware/auth.middleware');

const User = require('../models/user.model');
const router = new express.Router();

router.post('/users', async(req, res) => {
    const user = new User(req.body);

    try{
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    }
    catch(e){
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredential(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch(e){
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        
        await req.user.save();

        res.send();
    }catch(e){
        res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();

        res.send();
    }catch(e){
        res.status(500).send();
    }
})

router.get('/users/me', auth, async(req, res) => {
    res.send(req.user);
});

router.get('/users/:id', auth, async(req, res) => {
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

router.patch('/users/:id', async(req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "dateofBirth"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({"error": "invalid Updates!"});
    }

    try{
        const user = await User.findById(req.params.id);
        
        if(!user){
            return res.status(404).end('User not found!');
        }

        updates.forEach((update) => user[update] = req.body[update]);
        
        await user.save();
    
        res.send(user);
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.delete('/users/:id', async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).send({"error": "User not found"});
        }

        res.send(user);
    }
    catch(e){
        res.status(500).send();
    }
})

module.exports = router;