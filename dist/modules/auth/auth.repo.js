import { authModel } from "../../db/models/auth/auth.model.js";
import dbReposatory from "../../db/reposatories/db.reposatory.js";
export default class authrepo extends dbReposatory {
    model;
    constructor(model = authModel) {
        super(model);
        this.model = model;
    }
}
//# sourceMappingURL=auth.repo.js.map