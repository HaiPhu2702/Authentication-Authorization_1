import mongoose from "mongoose";


const userSchema =new mongoose.Schema({
    username:String,
    password:String,
    google:{
        id:{
            type:String,
        }
    }
})

const User=mongoose.model('User', userSchema)

export {User}