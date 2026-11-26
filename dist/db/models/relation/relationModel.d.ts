import mongoose, { Types } from "mongoose";
export interface Irelation {
    follower: Types.ObjectId;
    following: Types.ObjectId;
}
export declare const relationModel: mongoose.Model<any, {}, {}, {}, any, any, any> | mongoose.Model<Irelation, {}, {}, {}, mongoose.Document<unknown, {}, Irelation, {}, mongoose.DefaultSchemaOptions> & Irelation & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Irelation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=relationModel.d.ts.map