
const mongoose=require('mongoose')
const Post=mongoose.model('posts')
var EventEmitter=require('events')

    function mypost(id){
    var emitter=new EventEmitter();
   Post.find({ gid: id.gid}).
    then(reslt=>{
        console.log(reslt)
       // res.send("found")
      return emitter.emit("hii",reslt)
       // console.log("hiui")
    })
    return emitter;
    //return em.emit('hii')
    }

exports.mypost=mypost

module.exports.mypost=mypost