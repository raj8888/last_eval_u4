const express=require('express')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const userRouter=express.Router()
const {userModel}=require('../models/user.model')

userRouter.post('/register',async(req,res)=>{
    const {name,email,gender,pass}=req.body
    try {
        bcrypt.hash(pass, 5, async(err, hash)=> {
            const user=new userModel({name,email,gender,pass:hash})
            await user.save()
            res.send({"msg":"user registered"})
        });
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await userModel.find({email})
        if(user.length>0){
            let temp=user[0]._id
            bcrypt.compare(pass, user[0].pass, async(err, result)=> {
               if(result){
                const token=jwt.sign({ userID:user[0]._id }, process.env.seckey);
                res.send({"msg":"login succesull","token":token,userID:temp})
               }else{
                res.send({"msg":"wrong credentials"})
               }
            });
        }else{
            res.send({"msg":"wrong credentials"})
        }
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
})
module.exports={
    userRouter
}