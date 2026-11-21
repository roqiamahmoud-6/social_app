import { Router } from "express";
import { validation } from "../../common/middleware/validation.js";
import { getMyProfile, updateProfile } from "./user.validation.js";
import us from "../users/user.service.js"
import { follow, unfollow } from "../relation/relation.validation.js";
const userRouter=Router()

userRouter.get("/getMyProfile",validation(getMyProfile),us.getMyProfile)
userRouter.get("/updateProfile",validation(updateProfile),us.updateProfile)
userRouter.get("/follow/:id_user",validation(follow),us.follow)
userRouter.get("/unfollow/:id_user",validation(unfollow),us.unfollow)