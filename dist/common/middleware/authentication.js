import jwt from "jsonwebtoken";
import { secret_key } from "../../config/env.servie.js";
import { db } from "../../modules/auth/auth.service.js";
import redisService from "../../db/connection/connectionRedis.js";
export const authntication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: "token not exist" });
    }
    const decoded = jwt.verify(authorization, secret_key);
    if (!decoded?.id) {
        return res.status(404).json({ message: "invalid token" });
    }
    const user = await db.findbyid({
        id: decoded.id
    });
    if (!user) {
        return res.status(404).json({ message: "user not exist" });
    }
    if (await redisService.getValue({
        key: `revoke token :: ${user._id} :: ${decoded.jti}`
    })) {
        throw new Error("token expire from your device please login again");
    }
    req.user = user;
    req.decoded = decoded;
    next();
};
//# sourceMappingURL=authentication.js.map