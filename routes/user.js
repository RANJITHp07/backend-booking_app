const router=require('express').Router();
const User=require('../models/User');
const verify=require("../verifytoken")


//UPDATE
router.put("/:id",verify,async function(req,res){
    if(req.user.id===req.params.id || req.user.isAdmin ){
       
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body}) 
        res.status(201).json(updatedUser); 
    }catch(err){
           res.status(401).json(err);
    }
}
    else{
        req.status(500).json("it is not your account")
    }
});

//DELETE
router.delete("/:id",verify,async function(req,res){
    if(req.user.id===req.params.id || req.user.isAdmin ){
    try{
        await User.findByIdAndDelete(req.params.id)  
        res.status(200).json("succesfully deleted")
    }catch(err){
           res.status(401).json(err);
           console.log(err);
    }
}
    else{
        req.status(500).json("it is not your account")
        console.log("err")
    }
});

//GET
router.get("/find/:id",verify,async function(req,res){
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc;
        res.status(201).json(info);
    }catch(err){
           res.status(401).json(err);
    }
});
//GET ALL
router.get("/:id",verify,async function(req,res){
    if(req.user.isAdmin ){
    try{
        const allUser=await User.find() 
        res.status(201).json(allUser); 
    }catch(err){
           res.status(401).json(err);
    }
} 
    else{
        req.status(500).json("it is not your account")
    }
});

module.exports=router;