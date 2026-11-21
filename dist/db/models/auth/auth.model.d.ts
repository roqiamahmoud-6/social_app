import mongoose from "mongoose";
import { gender, role } from "../../../common/utilis/enum.js";
export interface Iuser {
    fname: string;
    lname: string;
    email: string;
    password: string;
    Cpassword: string;
    role: role;
    gender: gender;
    phone?: string;
    emailVerify?: boolean;
    isonfirmed?: boolean;
    profileImage?: string;
    changeCardintialAT?: Date;
}
export declare const authModel: mongoose.Model<any, {}, {}, {}, any, any, any> | mongoose.Model<Iuser, {}, {}, {}, mongoose.Document<unknown, {}, Iuser, {}, mongoose.DefaultSchemaOptions> & Iuser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Iuser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=auth.model.d.ts.map