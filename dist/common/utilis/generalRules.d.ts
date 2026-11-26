import z from "zod";
export declare const generalRules: {
    id: z.ZodString;
    file: z.ZodObject<{
        fieldname: z.ZodString;
        originalname: z.ZodString;
        encoding: z.ZodString;
        mimetype: z.ZodString;
        destination: z.ZodOptional<z.ZodString>;
        filename: z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
        size: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    email: z.ZodString;
    password: z.ZodString;
    token: z.ZodObject<{
        authorization: z.ZodString;
        connection: z.ZodString;
        "accept-encoding": z.ZodString;
        accept: z.ZodString;
        host: z.ZodString;
        "user-agent": z.ZodString;
        "content-length": z.ZodString;
        "postman-token": z.ZodString;
        "cache-control": z.ZodString;
    }, z.core.$strip>;
};
//# sourceMappingURL=generalRules.d.ts.map