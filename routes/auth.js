const express=require('express')
const router=express.Router();
const passport=require('passport');
const EventEmitter=require('events')

router.post('/google',passport.authenticate('google',
{scope:['profile','email']}));

router.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/' }),
(req, res) =>{
    const emitter=new EventEmitter();
  // Successful authentication, redirect home.
 // res.redirect('/dashbord');
 console.log("****************************************************************************");
 console.log(req.user.googleID)
 return emitter.emit("gotId",req.user.googleID)
 
});

router.get('/verify',(req,res)=>{
    if(req.user){
        console.log(req.user)
    }
    else{
        console.log('not auth')
    }
})
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})
module.exports=router;