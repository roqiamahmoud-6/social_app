import bcrybt from "bcrypt"
import { salt_or_round } from "../../config/env.servie.js";


const SALT_ROUNDS :number = salt_or_round;

export async function Hash(text:string) {
    return await bcrybt.hash(text, SALT_ROUNDS);
}

export async function Comparee(text:string, hashedText:string) {
    return await bcrybt.compare(text, hashedText);
}