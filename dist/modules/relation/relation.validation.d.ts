import * as z from "zod";
export declare const follow: {
    headers: z.ZodObject<{
        token: z.ZodAny;
    }, z.core.$loose>;
    params: z.ZodObject<{
        id_user: typeof z.any;
    }, z.core.$strict>;
};
export declare const unfollow: {
    headers: z.ZodObject<{
        token: z.ZodAny;
    }, z.core.$loose>;
    params: z.ZodObject<{
        id_user: typeof z.any;
    }, z.core.$strict>;
};
export declare const userSearch: {
    headers: z.ZodObject<{
        token: z.ZodAny;
    }, z.core.$loose>;
    query: z.ZodObject<{
        fname: z.ZodString;
    }, z.core.$strict>;
};
export declare const suggestion: {
    headers: z.ZodObject<{
        token: z.ZodAny;
    }, z.core.$loose>;
};
export declare const privateACC: {
    headers: z.ZodObject<{
        token: z.ZodAny;
    }, z.core.$loose>;
};
//# sourceMappingURL=relation.validation.d.ts.map