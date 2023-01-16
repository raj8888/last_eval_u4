const express=require("express")
const mongoose=require('mongoose')
const {connection}=require("./config/db")
const {userRouter}=require('./routes/users.route')
const {postsRouter}=require('./routes/posts.route')
const {authenticator}=require('./middleware/authenticater.middleware')
const cors=require("cors")
require('dotenv').config()
const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send('Home page')
})

app.use('/users',userRouter)
app.use(authenticator)
app.use("/posts",postsRouter)

app.listen(process.env.port,async(connection)=>{
    try {
        await connection
        console.log("connected to the db")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is runnin at ${process.env.port}`)
})