import { Model } from "mongoose";
import dbReposatory from "../../db/reposatories/db.reposatory.js";
import { Irelation } from "../../db/models/relation/relationModel.js";
export default class relationRepo extends dbReposatory<Irelation> {
    readonly model: Model<Irelation>;
    constructor(model?: Model<Irelation>);
}
//# sourceMappingURL=relation.repo.d.ts.map