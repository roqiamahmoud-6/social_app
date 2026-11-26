import mongoose from "mongoose";
import { gender } from "../../../common/utilis/enum.js";
export interface Iuserr {
    fname: string;
    lname: string;
    email: string;
    gender: gender;
    phone?: string;
    profileImage?: string;
    privacy?: string;
}
export declare const userModel: mongoose.Model<any, {}, {}, {}, any, any, any> | mongoose.Model<Iuserr, {}, {}, {}, mongoose.Document<unknown, {}, Iuserr, {}, mongoose.DefaultSchemaOptions> & Iuserr & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Iuserr & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=user.mode.d.ts.map