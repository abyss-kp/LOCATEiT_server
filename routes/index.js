const express=require('express')
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('it works');
})
router.get('/dashbord',(req,res)=>{
    res.send('dashbord');
})
module.exports=router;