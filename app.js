const express =require('express');
const mongoose=require('mongoose');
const passport=require('passport')
const cookieParser=require('cookie-parser');
const session=require('express-session')
const bodyparser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');
//load usermodel
require('./models/User')
require('./models/posts')
//passport config
//require('./config/psprt')(passport); /////////////uuuuundo

const app=express();


//load routes
const auth=require('./routes/auth');
var dex=require('./routes/index');
const posts=require('./routes/posts');
const oauth=require('./routes/oauth');
const myposts=require('./routes/myposts')
//load keys
const keys=require('./config/keys')

mongoose.Promise=global.Promise;

//mongoose
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
.then(() =>  console.log('mongoDB connected'))
.catch(err=>console.log(err))

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cors());
app.use(cookieParser())
/* app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
})) */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://locate-it-client1.herokuapp.com');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });
//passport middleware
/* app.use(passport.initialize());
app.use(passport.session()); */
//use routes

app.use('/auth',auth)
.on('gotId',function(gID){
    res.send({"msg":"Done","id":gID})
})

app.post('/login',function(req,res){
    console.log("login")
   userService.login()
.on('got',function(fndposts){
    console.log("sent")
    res.send({"msg":"Done"})
}) 
})
app.post('/find/posts',function(req,res){
    var usr=req.body
    dex.heyo()
    .on('hii',function(err){//emitter received here
        res.send({"data":err})
    })
})
app.post('/find/myposts',function(req,res){
    var usr=req.body
    myposts.mypost(usr)
    .on('hii',function(err){//emitter received here
        res.send({"data":err})
    })
})
app.use('/posts',posts)

 app.use('/oauth',oauth)
.on('gotId',function(gID){
    res.send({"msg":"Done"})
}) 
.on('exists',function(gID){
    res.send({"msg":"already there"})
}) 
//set global vars
app.use((req,res,next)=>{
    res.locals.user=req.user||null;
    next();
})


const port =process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server started at ${port}`)
})