import authrepo from "../auth/auth.repo.js";
import relationRepo from "../relation/relation.repo.js";
import { successResponse } from "../../common/utilis/successREsponce.js";
const db = new authrepo;
const relation = new relationRepo;
class postService {
    constructor() { }
    getMyProfile = successResponse(async (req, res, next) => {
        try {
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    });
}
export default new postService();
//# sourceMappingURL=post.service.js.map