import mongoose from "mongoose";
import { gender, provider, role } from "../../../common/utilis/enum.js";
import { date } from "zod";
export interface Iuserr{
   fname: string;
    lname: string;
    email: string;
    gender: gender;
    phone?: string;
    profileImage?: string;
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
    phone:String,
    profileImage:String,
},{
    timestamps:true,
    strictQuery:true
})


export const userModel =mongoose.models.user||mongoose.model<Iuserr>("user",userSchema)