const express=require('express')
const router=express.Router();
const mongoose=require('mongoose')
const Post=mongoose.model('posts')
//var MailService=require('../mailservice');//email
//const User=mongoose.model('users')
router.get('/',(req,res)=>{//email
   // res.send('posts/index');
})
router.get('/add',(req,res)=>{
  //  res.send('stories/add');
})

//Process add posts
router.post('/add',(req,res)=>{
   // const emitter=new EventEmitter();
    console.log("inside posts")
    const id=mongoose.Types.ObjectId(req.body.ied)
    const newPost={
        title:req.body.title,
        body:req.body.desc,
        user:id,
        image:req.body.image,
        name:req.body.name,
        gid:req.body.ied
    }

    new Post(newPost)
    .save()
    .then(post=>{
        console.log("stored in db.... ")
       // return emitter.emit("gotId")
   /*   User.find({ gid: id.gid}).
       then(reslt=>{
           console.log(reslt)
          // res.send("found")
         return emitter.emit("hii",reslt)
          // console.log("hiui")
       })*/
     /*  MailService.sendMail(userdetails.email,data.password)
       .on('Error',function(err){
           console.log("Error")
         return emitter3.emit("Error")
       })
       .on("sent",function(){
           console.log("sent")
           return emitter3.emit("sent")
       })  */                  
       res.send({"msg":"done"})
    })
})
module.exports=router;