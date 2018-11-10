const express =require('express');
const mongoose=require('mongoose');
const passport=require('passport')
const cookieParser=require('cookie-parser');
const session=require('express-session')
const bodyparser=require('body-parser');
const cors=require('cors');

//load usermodel
require('./models/User')
//passport config
require('./config/passport')(passport);

const app=express();


//load routes
const auth=require('./routes/auth');
const index=require('./routes/index');
//load keys
const keys=require('./config/keys')

mongoose.Promise=global.Promise;

//mongoose
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
.then(() =>  console.log('mongoDB connected'))
.catch(err=>console.log(err))

app.use(bodyparser.json());
app.use(cors());
app.use(cookieParser())
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}))
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//use routes
app.get('/',(req,res)=>{
    res.send({"msg":"failed"})
})
app.use('/auth',auth)
.on('gotId',function(gID){
    res.send({"msg":"Done","id":gID})
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