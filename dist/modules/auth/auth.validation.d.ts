import * as z from "zod";
import { gender, role } from "../../common/utilis/enum.js";
export declare const signUpSchema: {
    body: z.ZodObject<{
        fname: z.ZodString;
        lname: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        Cpassword: z.ZodString;
        role: z.ZodEnum<typeof role>;
        gender: z.ZodEnum<typeof gender>;
        phone: z.ZodOptional<z.ZodString>;
        isonfirmed: z.ZodOptional<z.ZodBoolean>;
        profileImage: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
};
export declare const emailVerifictionSchema: {
    body: z.ZodObject<{
        otp: z.ZodNumber;
        email: z.ZodEmail;
    }, z.core.$strict>;
};
export declare const login: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strict>;
};
export declare const refreshToken: {
    headers: z.ZodObject<{
        refresh_token: z.ZodString;
    }, z.core.$loose>;
};
export declare const revokeToken: {
    body: z.ZodObject<{
        email: z.ZodEmail;
    }, z.core.$strict>;
    headers: z.ZodObject<{
        access_token: z.ZodString;
    }, z.core.$loose>;
    query: z.ZodObject<{
        flag: z.ZodString;
    }, z.core.$strict>;
};
export declare const forgetPassword: {
    body: z.ZodObject<{
        email: z.ZodEmail;
    }, z.core.$strict>;
};
export declare const resetPassword: {
    body: z.ZodObject<{
        email: z.ZodEmail;
        newPASS: z.ZodString;
        otp: z.ZodNumber;
    }, z.core.$strict>;
};
export declare const signupWithEmail: {
    body: z.ZodObject<{
        idToken: z.ZodAny;
    }, z.core.$strict>;
};
//# sourceMappingURL=auth.validation.d.ts.map