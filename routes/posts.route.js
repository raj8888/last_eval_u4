const express=require('express')
const{postsModel}=require("../models/posts.model")
const postsRouter=express.Router()


postsRouter.get('/:id',async(req,res)=>{
    let id=req.params.id
    let query=req.query
    let posts=await postsModel.find({userID:id})
    let id_in_postmodel=posts[0].userID
    let id_in_post=req.body.userID
    if(id_in_post==id_in_postmodel){
        try {
            if(query.device){
                posts=await postsModel.find({device:query.device})
                res.send(posts)
            }else if(query.device1 && query.device2){
                posts=await postsModel.find({$or:[{device:query.device1},{device:query.device2}]})
                res.send(posts)
            }else{
                res.send(posts)
            }
            
        } catch (error) {
            res.send({"msg":"something went wrong"})
        }
    }else{
        res.send({"msg":"you are not allowed"})
    }
})

postsRouter.post('/create',async(req,res)=>{
    try {
        const payload=req.body
        const post=new postsModel(payload)
        await post.save()
        res.send({"msg":"post created"})
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
})

postsRouter.patch('/update/:id',async(req,res)=>{
    let id=req.params.id
    let payload=req.body
    let posts=await postsModel.find({_id:id})
    let id_in_postmodel=posts[0].userID
    let id_in_post=req.body.userID
    if(id_in_post==id_in_postmodel){
        try {
            await postsModel.findByIdAndUpdate({_id:id},payload)
            res.send({"msg":"post updated"})
        } catch (error) {
            res.send({"msg":"something went wrong"})
        }
    }else{
        res.send({"msg":"you are not allowed"})
    }

})

postsRouter.delete('/delete/:id',async(req,res)=>{
    let id=req.params.id
    let posts=await postsModel.find({_id:id})
    let id_in_postmodel=posts[0].userID
    let id_in_post=req.body.userID
    if(id_in_post==id_in_postmodel){
        try {
            await postsModel.findByIdAndDelete({_id:id})
            res.send({"msg":"post deleted"})
        } catch (error) {
            res.send({"msg":"something went wrong"})
        }
    }else{
        res.send({"msg":"you are not allowed"})
    }

})



module.exports={
    postsRouter
}