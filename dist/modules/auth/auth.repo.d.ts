import { Model } from "mongoose";
import { Iuser } from "../../db/models/auth/auth.model.js";
import dbReposatory from "../../db/reposatories/db.reposatory.js";
export default class authrepo extends dbReposatory<Iuser> {
    readonly model: Model<Iuser>;
    constructor(model?: Model<Iuser>);
}
//# sourceMappingURL=auth.repo.d.ts.map