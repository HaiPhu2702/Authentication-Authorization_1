import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "./src/middleware/passport";
import authRoutes from "./src/routes/auth.router"

const port=3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views','./src/views');


mongoose.connect('mongodb://localhost:27017/Passport')
    .then(()=>{
        console.log('connect success')
    })
    .catch((err)=>{throw err })

app.use(bodyParser.json());

app.use(session({
    secret:'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie:{secure: true,maxAge:60*60*1000}
}))

app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth',authRoutes)


app.use(bodyParser.urlencoded({extended:true}))

app.listen(port,()=>{
    console.log("http://localhost:"+port)
})