import express, { NextFunction, Request, Response } from "express"
import { port } from "./config/env.servie.js"
import cors from "cors"
import helmet from "helmet"
import{rateLimit}from"express-rate-limit"
import AppError from "./common/utilis/globalErrorHandling.js"
import { authRouter } from "./modules/auth/auth.controller.js"
import { connectDb } from "./db/connection/connectinDb.js"
import  redisService  from "./db/connection/connectionRedis.js"

const app =express()

const limiter =rateLimit({
    windowMs:60*5*1000,
    limit:20,
    message:"Too many requests ,game overr 😁"
})
async function bootstrap (){
  await connectDb()
  await redisService.connect()
  app.use(express.json(),limiter,helmet(),cors())
  app.use("/auth",authRouter)




  app.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({message:"hello on my app"})
  })
  app.use("{/*ddd}",(req:Request,res:Response,next:NextFunction)=>{
    
    res.status(404).json({message:`url :${req.originalUrl} or method ${req.method} not found`})
  })
  app.use((err:AppError,req:Request,res:Response,next:NextFunction)=>{
   const statusCode=err.cause as number ||500
   res.status(statusCode).json({
    message:err.message,
    stack:err.stack
   })
  })
  
  app.listen(port,()=>{console.log("app created sucessfully")})
}
export default bootstrap

