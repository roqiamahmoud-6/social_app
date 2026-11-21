import AppError from "../utilis/globalErrorHandling.js";
export const validation = (schema) => {
    return (req, res, next) => {
        const resultError = [];
        for (const key of Object.keys(schema)) {
            if (!schema[key])
                continue;
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
//# sourceMappingURL=validation.js.map