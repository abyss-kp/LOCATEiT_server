const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    googleID:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Name:{
        type:String
    },
    image:{
        type:String
    }
});

//create coll n add schema
const User=mongoose.model('users',UserSchema)
module.exports = User;