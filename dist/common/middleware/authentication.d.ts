import { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: any;
            decoded?: any;
        }
    }
}
export declare const authntication: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authentication.d.ts.map