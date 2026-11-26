import { NextFunction, Request, Response } from "express"
import userRepo from "../relation/relation.repo.js"
import jwt from "jsonwebtoken"
import { secret_key } from "../../config/env.servie.js"
import authrepo from "../auth/auth.repo.js"
import AppError from "../../common/utilis/globalErrorHandling.js"
import { Iuserr } from "../../db/models/users/user.mode.js"
import { Encrypt } from "../../db/security/encryption.js"
import { gender, privacy } from "../../common/utilis/enum.js"
import { Types } from "mongoose"
import relationRepo from "../relation/relation.repo.js"
import { Iuser } from "../../db/models/auth/auth.model.js"
import { successResponse } from "../../common/utilis/successREsponce.js"

const db =new authrepo 
const relation = new relationRepo

class postService{
    constructor(){}


     getMyProfile  =successResponse(async (req:Request,res:Response,next:NextFunction)=>{
        try{
       
    }catch(err){
            const error =err as AppError
            res.status(400).json({message:error.message, stack:error.stack})
        }


})




}

export default new postService()
