import bcrybt from "bcrypt";
import { salt_or_round } from "../../config/env.servie.js";
const SALT_ROUNDS = salt_or_round;
export async function Hash(text) {
    return await bcrybt.hash(text, SALT_ROUNDS);
}
export async function Comparee(text, hashedText) {
    return await bcrybt.compare(text, hashedText);
}
//# sourceMappingURL=hashing.js.map