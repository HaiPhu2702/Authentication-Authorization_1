import mongoose  from "mongoose";



const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    google:{
        id:String
    }
})


const User=mongoose.model('User',UserSchema)
export {User}