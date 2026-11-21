import { createClient } from "redis";
import { urlRedis } from "../../config/env.servie.js";
export class redisService {
    redisClient;
    constructor() {
        this.redisClient = createClient({
            url: urlRedis
        });
        this.handleEvent();
    }
    handleEvent() {
        this.redisClient.on("error", (error) => {
            console.log(`redis error${error.message}`);
        });
    }
    async connect() {
        await this.redisClient.connect();
        console.log("redis connected successfully👌");
    }
    async setValue({ key, value, ex }) {
        value = typeof value == "string" ? value : JSON.stringify(value);
        ex ?
            await this.redisClient.set(key, value, { EX: ex }) :
            await this.redisClient.set(key, value);
    }
    async getValue({ key }) {
        try {
            return JSON.parse(await this.redisClient.get(key));
        }
        catch (err) {
            return await this.redisClient.get(key);
        }
    }
    async incr({ key, ex = 60 * 6 }) {
        const value = await this.redisClient.incr(key);
        if (value === 1) {
            await this.redisClient.expire(key, ex);
        }
        return value;
    }
    async deleteKey({ key }) {
        await this.redisClient.del(key);
    }
    async ttl({ key }) {
        return await this.redisClient.ttl(key);
    }
    async exist({ key }) {
        return await this.redisClient.exists(key);
    }
    async updateIfExist({ key, value, ex }) {
        if (!await this.redisClient.exists(key)) {
            return 0;
        }
        else {
            value = typeof value == "string" ? value : JSON.stringify(value);
            ex ?
                await this.redisClient.set(key, value, { EX: ex }) :
                await this.redisClient.set(key, value);
        }
    }
}
export default new redisService();
//# sourceMappingURL=connectionRedis.js.map