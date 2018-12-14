const express=require('express')
const router=express.Router();
const keys=require('../config/keys');
const passport=require('passport')
const mongoose=require('mongoose')
const bodyparser=require('body-parser');
const EventEmitter=require('events')
//const Post=mongoose.model('posts')
const User=mongoose.model('users')
/* router.get('/',(req,res)=>{
    res.send('it works');
})
router.get('/dashbord',(req,res)=>{
    res.send('dashbord');
}) */

router.post('/google', 
 (req, res) =>{
    console.log(req.body)
    
    console.log("***********",console.log(req.body.data))
    const emitter=new EventEmitter();
    const newUser={
        googleID:req.body.data.id,
        email:req.body.data.email,
        Name:req.body.data.name,
        image:req.body.data.image
     }
     User.findOne({
        googleID:req.body.data.id
    }).then(user => {
        if(user){
            //return user
            console.log("already there")
            return emitter.emit("exists")
        }
        else{
            //create user
    new User(newUser).save()
    .then(user => {
        console.log("****************************************************************************");
        console.log(req.body.data.id)
        return emitter.emit("gotId",req.body.data.id)
    })
        }
    })
 
});
module.exports=router;