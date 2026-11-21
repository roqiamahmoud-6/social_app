import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
type requesttype = keyof Request;
type schematype = Partial<Record<requesttype, ZodType>>;
export declare const validation: (schema: schematype) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validation.d.ts.map