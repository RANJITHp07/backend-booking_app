const jwt=require('jsonwebtoken');

function verify(req,res,next){
    const token=req.cookies.access_token;
    if(token){
    jwt.verify(token,process.env.ACCESS_TOKEN,function(err,user){
        if(err){
            res.status(401).json("it is invalid");
        }
        else{
            req.user=user
            next();
        }
    })
    }
    else{
        res.status(401).json("you are not authenticated")
    }
}
module.exports=verify;