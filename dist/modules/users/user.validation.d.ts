import * as z from "zod";
export declare const getMyProfile: {
    headers: z.ZodObject<{
        token: z.ZodAny;
    }, z.core.$strip>;
};
export declare const updateProfile: {
    headers: z.ZodObject<{
        token: z.ZodAny;
    }, z.core.$strip>;
    body: z.ZodObject<{
        fname: z.ZodString;
        lname: z.ZodString;
        email: z.ZodEmail;
        gender: z.ZodString;
        profileImage: z.ZodString;
        phone: z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=user.validation.d.ts.map