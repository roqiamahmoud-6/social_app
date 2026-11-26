export const successResponse = (fn) => {
    return async (req, res, next) => {
        const { data = undefined, statusCode = 200, message = "done" } = await fn(req, res, next);
        if (res.headersSent)
            return;
        return res.status(statusCode).json({
            message,
            data
        });
    };
};
//# sourceMappingURL=successREsponce.js.map