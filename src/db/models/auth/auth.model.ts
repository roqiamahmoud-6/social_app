import mongoose from "mongoose";
import { gender, provider, role } from "../../../common/utilis/enum.js";
import { date } from "zod";
export interface Iuser{
   fname: string;
    lname: string;
    email: string;
    password: string;
    Cpassword: string;
    role: role;
    gender: gender;
    phone?: string;
    emailVerify?:boolean;
    isonfirmed?: boolean;
    profileImage?: string;
    changeCardintialAT?:Date;
    provider?:provider
}
const authSchema= new mongoose.Schema<Iuser>({
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
    password:{
        type:String,
        required:true
    },
    Cpassword:{
        type:String,
        required:true
    },
    role: {
    type: String,
    enum: Object.values(role)
    },
    gender: {
    type: String,
    enum: Object.values(gender),
    default: gender.male
    },
    phone:String,
    emailVerify:{
        type:Boolean,
        default :false
    },
    isonfirmed:Boolean,
    profileImage:String,
    changeCardintialAT:Date,   
    provider:{
        type:String,
       enum:provider,
        default:"system"
    },
},{
    timestamps:true,
    strictQuery:true
})


export const authModel =mongoose.models.auth||mongoose.model<Iuser>("auth",authSchema)