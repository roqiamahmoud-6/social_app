import { NextFunction, Request, Response } from "express"
import userRepo from "../relation/relation.repo.js"
import jwt from "jsonwebtoken"
import { secret_key } from "../../config/env.servie.js"
import authrepo from "../auth/auth.repo.js"
import AppError from "../../common/utilis/globalErrorHandling.js"
import { Iuserr } from "../../db/models/users/user.mode.js"
import { Encrypt } from "../../db/security/encryption.js"
import { gender } from "../../common/utilis/enum.js"
import { Types } from "mongoose"
import relationRepo from "../relation/relation.repo.js"
import { Iuser } from "../../db/models/auth/auth.model.js"

const db =new authrepo 
const relation = new relationRepo

class userService{
    constructor(){}


    async getMyProfile  (req:Request,res:Response,next:NextFunction){
        try{
        const{token}:any=req.headers
        if(!token){return res.status(401).json({message:"you must send token"})}
        const decoded= jwt.verify(token,secret_key)as jwt.JwtPayload & { id: string }
        if (!decoded?.id){return res.status(401).json({message:"invalid token"})}
        const user = await db.findbyid({
        id:decoded.id,
        options:{
            _id:1,
            fname:1,
            lname:1,
            email:1,
            gender:1,
            profileImage:1,
            phone:1
        }
    })
    if(!user){ return res.status(404).json ({message:"user not exist"})}
     res.status(200).json({user})
    }catch(err){
            const error =err as AppError
            res.status(400).json({message:error.message, stack:error.stack})
        }


}

    async updateProfile  (req:Request,res:Response,next:NextFunction){
        try{
       const{token}:any=req.headers
         if(!token){return res.status(401).json({message:"you must send token"})}
       const {fname,lname,email,gender,profileImage,phone}:Iuserr=req.body
        const decoded= jwt.verify(token,secret_key)as jwt.JwtPayload & { id: string }
        if (!decoded?.id){return res.status(401).json({message:"invalid token"})}
        const updateQuery:{
            fname?:string,
            lname?:string,
            phone?:string,
            email?:string,
            gender?:gender,
            profileImage?:string
        } = {}

    if (fname !== undefined) {updateQuery.fname = fname}
    if (email !== undefined) {updateQuery.email = email}
    if (lname !== undefined) {updateQuery.lname = lname}
    if (gender !== undefined) {updateQuery.gender = gender}
    if (profileImage !== undefined) {updateQuery.profileImage = profileImage}
    if (phone !== undefined) {
      updateQuery.phone = Encrypt(phone);
    }
        const user= await db.findByIdAndUpdate({
            id:decoded.id,
            updateData:updateQuery,
            options:{
              _id:1,
            fname:1,
            lname:1,
            email:1,
            gender:1,
            profileImage:1,
            phone:1
            }
        })
       if(!user){ return res.status(404).json ({message:"user not exist"})}
     res.status(200).json({message:"updated successfully",user})

    }catch(err){
            const error =err as AppError
            res.status(400).json({message:error.message, stack:error.stack})
        }


}

    async follow  (req:Request,res:Response,next:NextFunction){
        try{

       const{token}:any=req.headers
       const{id_user}:any=req.params
         if(!token){return res.status(401).json({message:"you must send token"})}
        const decoded= jwt.verify(token,secret_key)as jwt.JwtPayload & { id: string }
        if (!decoded?.id){return res.status(401).json({message:"invalid token"})}
         const user = await db.findbyid({
            id:decoded.id
         })
        if(!user){ return res.status(404).json ({message:"user not exist"})}
        const user2 = await db.findbyid({
            id:id_user
        })
        if(!user2){ return res.status(404).json ({message:"user that you search about him not exist"})}
        if(user._id === user2._id){throw new AppError("not allow to follow your self",400)}
        const r_exist=await relation.find({
            condition:{
                follower:user._id,
                following:user2._id
            }
        })
        if(r_exist){throw new AppError("relation already exist",400)}
        const r =await relation.create({
            data:{
                follower:user._id,
                following:user2._id
            }
        })
        res.status(201).json("follow successfully")
    }catch(err){
            const error =err as AppError
            res.status(400).json({message:error.message, stack:error.stack})
        }


}

    async unfollow  (req:Request,res:Response,next:NextFunction){
        try{
        const { token }: any = req.headers
        const { id_user }: any = req.params

        if (!token) { return res.status(401).json({ message: "you must send token" }) }
        const decoded = jwt.verify(token, secret_key) as jwt.JwtPayload & { id: string }
        if (!decoded?.id) { return res.status(401).json({ message: "invalid token" })}
        const user = await db.findbyid({ id: decoded.id})
        if (!user) { return res.status(404).json({ message: "user not exist" }) }
        const user2 = await db.findbyid({
            id: id_user
        })
        if (!user2) { return res.status(404).json({ message: "user that you search about him not exist" })  }
        const r_exist = await relation.find({
            condition: {
                follower: user._id,
                following: user2._id
            }
        })
        if (!r_exist) {
            throw new AppError("relation not exist", 404)
        }
        await relation.deleteone({
            data: {
                follower: user._id,
                following: user2._id
            }
        })

        return res.status(200).json({ message: "unfollow successfully" })
    }catch(err){
            const error =err as AppError
            res.status(400).json({message:error.message, stack:error.stack})
        }


}


}

export default new userService()
