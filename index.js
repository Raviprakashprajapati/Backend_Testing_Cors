import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
const app = express()

dotenv.config({
    path:"./env"
})

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
    console.log(process.env.PORT)
    
app.get("/",(req,res)=>{
    
    const options = {
        httpOnly:true,
        secure:true
    }
    return res
            .clearCookie("firstCookie",options)
            .clearCookie("secondCookie",options)
            .send(`Its running.... PORT: ${process.env.PORT} `)
})

app.get("/cookie",(req,res)=>{

    const options = {
        httpOnly:true,
        secure:true,
        sameSite:'None',
        expires:new Date(Date.now() + 7 * 24 *60 *60*1000),
    }

    return res.status(200)
    .cookie("firstCookie","1234566",options)
    .cookie("secondCookie","gdfgdgdf",options)
    .json({
        message:"success"
    })


})



app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log("Err ",err)
    }else{
        console.log(`PORT RUNNING ...${process.env.PORT}`)
    }
})
