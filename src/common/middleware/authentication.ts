import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { secret_key } from "../../config/env.servie.js"
import { db } from "../../modules/auth/auth.service.js"
import  redisService  from "../../db/connection/connectionRedis.js"

declare global{
    namespace Express{
        interface Request{
            user?:any,
            decoded?:any
        }
    }
}

export const authntication =async (req:Request,res:Response,next:NextFunction)=>{
   const {authorization}=req.headers
   if(!authorization){
    return res.status(401).json ({message:"token not exist"})
   }
   const decoded = jwt.verify(authorization,secret_key) as JwtPayload
   if (!decoded?.id){return res.status(404).json({message:"invalid token"})}
   const user = await db.findbyid({
    id:decoded.id
   })
    if(!user){ return res.status(404).json ({message:"user not exist"})}

    if(await redisService.getValue({
      key:`revoke token :: ${user._id} :: ${decoded.jti}`
    })){
       throw new Error("token expire from your device please login again")
    }
    req.user=user
    req.decoded=decoded
    next()
    
  }
