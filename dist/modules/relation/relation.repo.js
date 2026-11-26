import dbReposatory from "../../db/reposatories/db.reposatory.js";
import { relationModel } from "../../db/models/relation/relationModel.js";
export default class relationRepo extends dbReposatory {
    model;
    constructor(model = relationModel) {
        super(model);
        this.model = model;
    }
}
//# sourceMappingURL=relation.repo.js.map