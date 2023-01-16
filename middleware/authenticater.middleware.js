const jwt=require('jsonwebtoken')
require('dotenv').config
const authenticator=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decoded= jwt.verify(token, process.env.seckey);
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            next()
        }else{
            res.send({"msg":"please login"})
        }
    }else{
        res.send({"msg":"please login"})
    }
}


module.exports={
    authenticator
}