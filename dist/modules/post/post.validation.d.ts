import * as z from "zod";
import { AllowEnum, AvailabilityEnum } from "../../common/utilis/enum.js";
export declare const createPostSchema: {
    body: z.ZodObject<{
        content: z.ZodOptional<z.ZodString>;
        attachments: z.ZodOptional<z.ZodArray<z.ZodObject<{
            fieldname: z.ZodString;
            originalname: z.ZodString;
            encoding: z.ZodString;
            mimetype: z.ZodString;
            destination: z.ZodOptional<z.ZodString>;
            filename: z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
            size: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        allowComment: z.ZodDefault<z.ZodEnum<typeof AllowEnum>>;
        availability: z.ZodDefault<z.ZodEnum<typeof AvailabilityEnum>>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>;
};
//# sourceMappingURL=post.validation.d.ts.map