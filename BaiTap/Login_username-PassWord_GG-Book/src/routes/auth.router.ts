import express from "express";
const router=express.Router();
import multer from "multer";
const upload=multer()
import passport from "../middleware/passport";
import { User } from "../schema/user.model";

router.get('/create', (req, res) => {
    res.render('create')
})
router.post('/create', upload.none(),async (req, res) => {
   const newUser=new User(req.body);
   await newUser.save();
   res.render('home')
})



router.get('/login', async (req, res) => {
res.render('login')
})
router.post('/login', upload.none(),async (req, res,next) => {
await passport.authenticate('local', (err, user) => {
    if (err){return next(err)}
    if (!user){return res.send('sai password')}
    res.render('home')
})
(req,res,next)
})

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.send('vao thanh cong')
    });







export default router;