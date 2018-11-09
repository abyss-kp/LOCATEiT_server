const express =require('express');
const mongoose=require('mongoose');
const passport=require('passport')

//passport config
require('./config/passport')(passport);

const app=express();

//load routes
const auth=require('./routes/auth');
//use routes
app.use('/auth',auth)

const port =process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server started at ${port}`)
})