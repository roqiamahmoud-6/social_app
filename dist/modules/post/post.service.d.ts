import { NextFunction, Request, Response } from "express";
declare class postService {
    constructor();
    getMyProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: postService;
export default _default;
//# sourceMappingURL=post.service.d.ts.map