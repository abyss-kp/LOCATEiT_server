const JWT = require('jsonwebtoken')
const User = require('../models/User')
const { JWT_SECRET } = require('../config')
signtoken = user => {
    return JWT.sign({
        iss: "Kapil",
        sub: user._id,
        iat: new Date().getTime(),//current time
        exp: new Date().setDate(new Date().getDate() + 1)//current time + 1 day ahead
    }, JWT_SECRET);
}
module.exports = {
    googleOAuth : async(req,res,next)=>{
        console.log('req.user',req.user);
        const token=signtoken(req.user);
     //   console.log('signIn');
        res.status(200).json({token});
}
}