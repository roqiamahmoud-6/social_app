import { Model } from "mongoose";
import { authModel, Iuser } from "../../db/models/auth/auth.model.js";
import dbReposatory from "../../db/reposatories/db.reposatory.js";
import { Iuserr, userModel } from "../../db/models/users/user.mode.js";
import { Irelation, relationModel } from "../../db/models/relation/relationModel.js";

export default class relationRepo extends  dbReposatory<Irelation>{
    constructor(public readonly model:Model<Irelation>=relationModel){
         super(model)
    }
}