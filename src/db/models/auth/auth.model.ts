import mongoose, { HydratedDocument } from "mongoose";
import { gender, privacy, provider, role } from "../../../common/utilis/enum.js";
import { date } from "zod";
import { salt_or_round } from "../../../config/env.servie.js";
import { Hash } from "../../security/hashing.js";
import { generateOtp, sendEmail } from "../../../common/utilis/sendEmail.js";
import { emailVerify } from "../../../common/html/emailVerify.js";
import { Encrypt } from "../../security/encryption.js";
import  redisService from "../../connection/connectionRedis.js";
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
    provider?:provider;
    privacy?:privacy;
    isDeleated?:boolean
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
    isDeleated:{
        type:Boolean,
       default:false
    }
},{
    timestamps:true,
    strictQuery:true
})

authSchema.pre("save",async function(this:HydratedDocument<Iuser & {is_new:boolean}> ){
    if (this.modifiedPaths().includes("password")){
        this.password=await Hash (this.password)
        this.Cpassword=await Hash(this.Cpassword)
    }
    if (this.modifiedPaths().includes("phone")){
    this.phone=await Encrypt(this.phone)
    }
})

authSchema.post("save",async function(){
    const that=this as HydratedDocument<Iuser & {is_new:boolean}>
    if(that.is_new){
        const otp=generateOtp()
        const otpp:any= await redisService.setValue({
            key:`otp:${this.email}`,
            value:otp,
            ex:5*60
        })
        await sendEmail({
            to:this.email,
            subject:"email verify",
            html:emailVerify(otp)
        })
    }
})

authSchema.pre(["findOne","find"],async function(){
   const query=this.getQuery()
   const {paranoid, ...rest}=query
   if(paranoid===true){
    this.setQuery({...rest})
   }else{
    this.setQuery({...rest,isDeleted:{$exists:false}})
   }
})

export const authModel =mongoose.models.auth||mongoose.model<Iuser>("auth",authSchema)