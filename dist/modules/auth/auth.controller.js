import { Router } from "express";
import AS from "./auth.service.js";
import { validation } from "../../common/middleware/validation.js";
import { emailVerifictionSchema, forgetPassword, login, refreshToken, resetPassword, revokeToken, signUpSchema } from "./auth.validation.js";
export const authRouter = Router();
authRouter.post("/signUp", validation(signUpSchema), AS.signUp);
authRouter.post("/emailVerifiction", validation(emailVerifictionSchema), AS.emailVerifiction);
authRouter.get("/login", validation(login), AS.login);
authRouter.post("/refreshToken", validation(refreshToken), AS.refreshToken);
authRouter.post("/revokeToken", validation(revokeToken), AS.revokeToken);
authRouter.post("/forgetPassword", validation(forgetPassword), AS.forgetPassword);
authRouter.post("/resetPassword", validation(resetPassword), AS.resetPassword);
//# sourceMappingURL=auth.controller.js.map