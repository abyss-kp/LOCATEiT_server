const passport=require('passport');
const JwtStrategy=require('passport-jwt').Strategy;
const {ExtractJwt} =require('passport-jwt');
const LocalStrategy = require('passport-local');
const GooglePlusTokenStrategy=require('passport-google-plus-token')
const {JWT_SECRET}=require('./config');
const User=require('./modals/user')

//JSON WEB TOKEN STRATEGY 
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey:JWT_SECRET
},
async(payload,done)=>{
try{
//find user from token
const user=await User.findById(payload.sub);

//if dont exist
if(!user){
    return done(null,false);
}
//otherwise return user
done(null,user);
}
catch(error){
done(error,false);
}
}
));


//Google Oauth Strstegy
passport.use('googleToken',new GooglePlusTokenStrategy({
clientID:'373941203091-i6s44m0o6ohjvt8hktcpnfkq6dogh2ok.apps.googleusercontent.com',
clientSecret:'gXdxQUXa0zv5LiyhshBetOdq'
},async (accessToken,refreshToken,profile,done)=>{
try {
    console.log(accessToken);
console.log(refreshToken);
console.log(profile);

//check if user exists
const existingUser=await User.findOne({'google.id':profile.id})
if(existingUser){
    console.log("already in db")
    return done(null,existingUser);
}

//if new account
console.log("creating new in db")
const newUser=new User({
    method:'google',
    google:{
        id:profile.id,
        email:profile.emails[0].value
    }
})
await newUser.save();
done(null,newUser)
}
catch(error){
    done(error,false,error.message);
}
}))




//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField:'email'
},async (email,password,done)=>{
   
   try { //Find user with give email
const user=await User.findOne({"local.email":email});

    //if not handle it
if(!user){
    return done(null,false)
}

//check if passwd correct
const isMatch=await user.isValidPassword(password)

//it not handle
if(!isMatch){
    return done(null,false);
}

//otherwise
done(null,user);
}
catch(error){
done(error,false);
}
}))