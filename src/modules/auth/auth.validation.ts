import * as z from "zod"
import { gender, role } from "../../common/utilis/enum.js"
import { Query } from "mongoose"
import { id } from "zod/locales"
import { IdTokenClient } from "google-auth-library"

export const signUpSchema ={
    body:z.strictObject({
         fname:z.string().min(2,"fname should be at least 2 chars").max(20),
         lname: z.string().min(2,"lname should be at least 2 chars").max(20),
        email: z.email(),
        password:z.string() ,
        Cpassword:z.string(),
         role: z.enum(role),
        gender: z.enum(gender),
        phone: z.string().regex(/^01[0125][0-9]{8}$/).optional(),
         isonfirmed: z.boolean().optional(),
        profileImage: z.string().optional()
    }).superRefine((val,ctx)=>{
        if(val.password !== val.Cpassword){
            ctx.addIssue({
                code:"custom",
                message:"password must equal cpassword",
                path:["Cpassword"]
            })
        }
    })
}
export const emailVerifictionSchema ={
    body:z.strictObject({
        otp:z.number(),
        email:z.email()
    })
}
export const login ={
    body:z.strictObject({
        email:z.email(),
         password:z.string() 
    })
}
export const refreshToken ={
    headers:z.strictObject({
        refresh_token:z.string()
    }).passthrough()
}
export const revokeToken ={
   body:z.strictObject({
        email:z.email()
    }),
      headers:z.strictObject({
        access_token:z.string()
    }).passthrough(),
    query:z.strictObject({
        flag:z.string()
    })
}
export const forgetPassword ={
 body:z.strictObject({
        email:z.email()
    })
}
export const resetPassword ={
 body:z.strictObject({
        email:z.email(),
        newPASS:z.string(),
        otp:z.number()
    })
}
export const signupWithEmail ={
 body:z.strictObject({
        idToken:z.any()
    })
}