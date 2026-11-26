import z from "zod";
import { Types } from "mongoose";

export const generalRules = {
    id: z.string().refine((value) => {
        return Types.ObjectId.isValid(value) ? true : false;
    }),
    file: z.object({
        fieldname: z.string(),
        originalname: z.string(),
        encoding: z.string(),
        mimetype: z.string(),
        destination: z.string().optional(),
        filename: z.string().optional(),
        path: z.string().optional(),
        size: z.number().optional()
    }),
    email: z.string().email(),
    password: z.string(),
    token: z.object({
        authorization: z.string(),
        connection: z.string(),
        "accept-encoding": z.string(),
        accept: z.string(),
        host: z.string(),
        "user-agent": z.string(),
        "content-length": z.string(),
        "postman-token": z.string(),
        "cache-control": z.string(),
    })
}
