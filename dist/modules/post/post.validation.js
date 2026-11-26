import * as z from "zod";
import { AllowEnum, AvailabilityEnum } from "../../common/utilis/enum.js";
import { generalRules } from "../../common/utilis/generalRules.js";
export const createPostSchema = {
    body: z.strictObject({
        content: z.string().min(1).trim().optional(),
        attachments: z.array(generalRules.file).optional(),
        allowComment: z.enum(AllowEnum).default(AllowEnum.allow),
        availability: z.enum(AvailabilityEnum).default(AvailabilityEnum.public),
        tags: z.array(generalRules.id).optional()
    }).superRefine((args, ctx) => {
        if (!args.content && !args.attachments?.length) {
            ctx.addIssue({
                code: "custom",
                message: "content is required",
                origin: ["content"]
            });
        }
        if (args?.tags?.length) {
            const uniqueTags = new Set(args.tags);
            if (args.tags.length !== uniqueTags.size) {
                ctx.addIssue({
                    code: "custom",
                    message: "Duplicate on tags id",
                    origin: ["tags"]
                });
            }
        }
    })
};
//# sourceMappingURL=post.validation.js.map