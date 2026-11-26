import { Router } from "express";
import AS from "./auth.service.js";
import { validation } from "../../common/middleware/validation.js";
import { emailVerifictionSchema, forgetPassword, login, refreshToken, resetPassword, revokeToken, signUpSchema, signupWithEmail } from "./auth.validation.js";
import { authntication } from "../../common/middleware/authentication.js";
export const authRouter = Router();
authRouter.post("/signUp", validation(signUpSchema), AS.signUp);
authRouter.post("/emailVerifiction", validation(emailVerifictionSchema), AS.emailVerifiction);
authRouter.get("/login", validation(login), AS.login);
authRouter.post("/refreshToken", validation(refreshToken), authntication, AS.refreshToken);
authRouter.post("/revokeToken", validation(revokeToken), authntication, AS.revokeToken);
authRouter.post("/forgetPassword", validation(forgetPassword), AS.forgetPassword);
authRouter.post("/resetPassword", validation(resetPassword), AS.resetPassword);
authRouter.post("/signupWithEmail", validation(signupWithEmail), AS.signupWithEmail);
//# sourceMappingURL=auth.controller.js.map