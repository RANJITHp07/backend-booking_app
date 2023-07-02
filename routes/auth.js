const router=require('express').Router();
const User = require('../models/User');
const jwt=require("jsonwebtoken");
var CryptoJS = require("crypto-js");

//REGISTER
router.post("/register",async function(req,res,next){
    try{
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString()
        });
        await newUser.save();
        res.status(201).json(newUser);
    }catch(err){
        next(err)
    }
    
});
//LOGIN
router.post('/login',async function(req,res){
    const user= await User.findOne({email:req.body.email})
    if(user){
        var bytes  = CryptoJS.AES.decrypt(user.password, process.env.ACCESS_TOKEN);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        if(originalText===req.body.password){
           const accessToken=jwt.sign({id:user._id,isAdmin:user.isAdmin },
            process.env.ACCESS_TOKEN,
            {expiresIn:'5d'})
           
            const {password,...info}=user._doc
            res.cookie("access_token",accessToken,{
                httpOnly:true
            }).status(201).json({info,accessToken})
        }
        else{
            res.status(500).json("wrong password");
        }
    }
    else{
        res.status(500).json("wrong email id");
    }
})
module.exports=router