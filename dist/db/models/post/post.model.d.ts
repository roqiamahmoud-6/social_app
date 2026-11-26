import mongoose, { Types } from "mongoose";
import { AllowEnum, AvailabilityEnum } from "../../../common/utilis/enum.js";
export interface Ipost {
    content: string;
    attachments: string[];
    createdBy: Types.ObjectId;
    folderId: string;
    tags: Types.ObjectId[];
    likes: Types.ObjectId[];
    allowComment: AllowEnum;
    availability: AvailabilityEnum;
}
export declare const postModel: mongoose.Model<any, {}, {}, {}, any, any, any> | mongoose.Model<Ipost, {}, {}, {}, mongoose.Document<unknown, {}, Ipost, {}, mongoose.DefaultSchemaOptions> & Ipost & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Ipost & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=post.model.d.ts.map