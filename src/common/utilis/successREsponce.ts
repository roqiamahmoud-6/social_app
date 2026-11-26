import { NextFunction, Request, Response } from "express"

export const successResponse = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { data = undefined, statusCode = 200, message = "done" } = await fn(req, res, next)

        if (res.headersSent) return

        return res.status(statusCode).json({
            message,
            data
        })
    }
}