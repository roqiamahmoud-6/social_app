import * as z from "zod";
export const getMyProfile = {
    headers: z.object({
        token: z.any()
    })
};
export const updateProfile = {
    headers: z.object({
        token: z.any()
    }),
    body: z.object({
        fname: z.string(),
        lname: z.string(),
        email: z.email(),
        gender: z.string(),
        profileImage: z.string(),
        phone: z.string(),
    })
};
//# sourceMappingURL=user.validation.js.map