import express from "express";
const router=express.Router();
import multer from "multer"
import passport from "passport";
import {User} from "../schema/user.model";
const upload=multer()

router.get("/create", (req, res) =>{
    res.render("create")
})


router.post("/create", upload.none(),async (req, res) =>{
    console.log(req.body)

    const newUser=new User(req.body)
    console.log(newUser)
    await newUser.save();
    res.end("success create")
})


router.get('/login',   (req, res,next) => {
    res.render('login')
})

router.post('/login', upload.none(),async (req, res,next) => {

    passport.authenticate("local",(err,user) => {
         if (err){
             return next(err)
         }
         if(!user){
             return res.send('wrong password')
         }
         req.login(user,()=>{
             res.send('you are authenticated')
         })
    })

    (req, res, next)
})

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log('oke')
        res.redirect('/');
    });




export default router;