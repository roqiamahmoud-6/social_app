import { resolve } from "path";
import { config } from "dotenv";
const envpath = {
    development: ".env.development",
    production: ".env.production",
};
const selectedEnv = envpath[process.env.NODE_ENV];
config({
    path: resolve(`${selectedEnv}`)
});
export const port = +process.env.PORT;
export const salt_or_round = +process.env.salt_or_round;
export const secret_key = process.env.secret_key;
export const secret_key_refresh = process.env.secret_key_refresh;
export const urlDb = process.env.urlDb;
export const urlRedis = process.env.urlRedis;
export const passwordEmail = process.env.passwordEmail;
export const clientId = process.env.clientId;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
//# sourceMappingURL=env.servie.js.map