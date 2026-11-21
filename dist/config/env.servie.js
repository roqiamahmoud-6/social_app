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
//# sourceMappingURL=env.servie.js.map