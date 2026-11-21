import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import AppError from "../utilis/globalErrorHandling.js";

type requesttype = keyof Request;
type schematype = Partial<Record<requesttype, ZodType>>;

export const validation = (schema: schematype) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const resultError = [];

        for (const key of Object.keys(schema) as requesttype[]) {
            if (!schema[key]) continue;

            const result = schema[key]?.safeParse(req[key]);

            if (!result.success) {
                resultError.push(...result.error.issues);
            }
        }

        if (resultError.length > 0) {
            throw new AppError(JSON.stringify(resultError), 400);
        }

        next();
    };
};