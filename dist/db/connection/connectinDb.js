import mongoose from "mongoose";
import { urlDb } from "../../config/env.servie.js";
export async function connectDb() {
    await mongoose.connect(urlDb)
        .then(() => {
        console.log("db connected successfully");
    }).catch((err) => {
        console.log("db not connectedd");
    });
}
//# sourceMappingURL=connectinDb.js.map