import { Model } from "mongoose";
import { authModel, Iuser } from "../../db/models/auth/auth.model.js";
import dbReposatory from "../../db/reposatories/db.reposatory.js";

export default class authrepo extends  dbReposatory<Iuser>{
    constructor(public readonly model:Model<Iuser>=authModel){
         super(model)
    }
}