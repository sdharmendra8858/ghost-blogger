const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const auth = require('../middleware/auth.middleware');
const User = require('../models/user.model');
const { sendWelcomeMail, sendRemoveMail } = require('../email/email');

const router = new express.Router();

router.post('/users', async(req, res) => {
    const user = new User(req.body);

    try{
        const token = await user.generateAuthToken();
        sendWelcomeMail(req.body.email, req.body.name);
        await user.save();
        res.status(201).send({ user, token });
    }
    catch(e){
        res.status(400).send(e);
    }
});

router.get('/users', async(req, res) => {
    try{
        const users = await User.find({})
        res.status(200).send({users});
    }
    catch(e){
        res.status(500).send();
    }
})

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

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an jpg file'))
        }

        cb(undefined, true);
    }
})

router.get('/users/:userId', auth, async(req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            res.status(404).send({"error": "user not found"});
        }
        res.send(user);
    }
    catch(e){
        res.status(500).send();
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // req.user.avatar = req.file.buffer;
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send(req.user)
}, (error, req, res, next) => {
    res.status(400).send({"error": error.message});
})

router.delete('/users/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined;
    await req.user.save()
    res.send();
})

router.get('/users/:id/avatar', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    }catch(e){
        res.status(500).send();
    }



})

router.patch('/users/me', auth, async(req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "dateofBirth"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({"error": "invalid Updates!"});
    }

    try{
        updates.forEach((update) => req.user[update] = req.body[update]);
        
        await req.user.save();
    
        res.send(req.user);
    }
    catch(e){
        res.status(400).send(e);
    }
})

router.delete('/users/me', auth, async(req, res) => {
    try{
        await req.user.remove();
        sendRemoveMail(req.user.email, req.user.name)
        res.send(req.user);
    }
    catch(e){
        res.status(500).send();
    }
})

module.exports = router;