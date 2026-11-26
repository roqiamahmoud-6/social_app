import mongoose from "mongoose";
import { gender, privacy, provider, role } from "../../../common/utilis/enum.js";
import { date } from "zod";
import { Hash } from "../../security/hashing.js";
import { salt_or_round } from "../../../config/env.servie.js";
export interface Iuserr{
   fname: string;
    lname: string;
    email: string;
    gender: gender;
    phone?: string;
    profileImage?: string;
    privacy?: string;
}
const userSchema= new mongoose.Schema<Iuserr>({
   fname:{
        type:String,
        required:true,
        min:2,
        max:20
    },
    lname:{
        type:String,
        required:true,
        min:2,
        max:20
    },
    email:{
        type:String,
        required:true
    },
    gender: {
    type: String,
    enum: Object.values(gender),
    default: gender.male
    },
    privacy: {
    type: String,
    enum: Object.values(privacy),
    default: privacy.public
    },
    phone:String,
    profileImage:String,
},{
    timestamps:true,
    strictQuery:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


export const userModel =mongoose.models.user||mongoose.model<Iuserr>("user",userSchema)