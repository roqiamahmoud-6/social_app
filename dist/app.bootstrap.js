import express from "express";
import { port } from "./config/env.servie.js";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { authRouter } from "./modules/auth/auth.controller.js";
import { connectDb } from "./db/connection/connectinDb.js";
import redisService from "./db/connection/connectionRedis.js";
import { s3service } from "./common/service/s3.service.js";
import { pipeline } from "node:stream/promises";
import notificationService from "./common/service/notification.service.js";
const app = express();
const limiter = rateLimit({
    windowMs: 60 * 5 * 1000,
    limit: 20,
    message: "Too many requests ,game overr 😁"
});
async function bootstrap() {
    await connectDb();
    await redisService.connect();
    app.use(express.json(), limiter, helmet(), cors());
    app.use("/auth", authRouter);
    app.post("/send-notification", async (req, res, next) => {
        await notificationService.sendNotification({
            token: req.body.token,
            data: {
                title: "hi hi hi ",
                body: "hi tany ya negm"
            }
        });
    });
    app.get("/upload/pre_signed/*path", async (req, res, next) => {
        const { path } = req.params;
        const { download } = req.query;
        const key = path.join("/");
        const url = await new s3service().get_Signed_Url({
            key,
            expiresIn: 60,
            download: download === "true"
        });
        return res.status(200).json({
            message: "success",
            url
        });
    });
    app.get("/upload/*path", async (req, res, next) => {
        const { path } = req.params;
        const { download } = req.query;
        const key = path.join("/");
        const result = await new s3service().getFile(key);
        const stream = result.Body;
        if (result.ContentType) {
            res.setHeader("Content-Type", result.ContentType);
            res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
            if (download && download == "true") {
                res.setHeader("Content-Disposition", `attachment; filename="${path.pop()}"`);
            }
        }
        pipeline(stream, res);
    });
    app.get("/", (req, res, next) => {
        res.status(200).json({ message: "hello on my app" });
    });
    app.use("{/*ddd}", (req, res, next) => {
        res.status(404).json({ message: `url :${req.originalUrl} or method ${req.method} not found` });
    });
    app.use((err, req, res, next) => {
        const statusCode = err.cause || 500;
        res.status(statusCode).json({
            message: err.message,
            stack: err.stack
        });
    });
    app.listen(port, () => { console.log("app created sucessfully"); });
}
export default bootstrap;
//# sourceMappingURL=app.bootstrap.js.map