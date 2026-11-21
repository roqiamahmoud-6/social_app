import { randomInt } from "node:crypto";
import nodemailer from "nodemailer";
import { passwordEmail } from "../../config/env.servie.js";

export const sendEmail =async({to,subject,html}:{to:string,subject:any,html:any})=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"rokasaber94@gmail.com",
            pass:passwordEmail
        }
    })
    const info =await transporter.sendMail({
        from:`sacialAPP<rokasaber94@gmail.com>`,
        to,
        subject,
        html,
    })
}
export const generateOtp=()=>{
  return randomInt(100000,1000000).toString()
}