import mongoose, { HydratedDocument, Types } from "mongoose";
import { AllowEnum, AvailabilityEnum } from "../../../common/utilis/enum.js";

export interface Ipost{
   content: string,
    attachments: string[],
    createdBy: Types.ObjectId,
    folderId: string
    tags: Types.ObjectId[],
    likes: Types.ObjectId[],
    allowComment: AllowEnum,
    availability: AvailabilityEnum
   
}
const postSchema= new mongoose.Schema<Ipost>({
   content: {type: String,
        required: function (this:Ipost) {
            return ! this?.attachments?.length
        }
    },
    attachments: [String],
    folderId: { type: String, trim: true },
    createdBy: { type: Types.ObjectId, ref: "user", required: true },
    tags: [{ type: Types.ObjectId, ref: "user" }],
    likes: [{ type: Types.ObjectId, ref: "user" }],
    allowComment: { type: String, enum: AllowEnum, default: AllowEnum.allow },
    availability: { type: String, enum: AvailabilityEnum, default: AvailabilityEnum.public },
  
},{
    timestamps:true,
    strictQuery:true
})



export const postModel =mongoose.models.post||mongoose.model<Ipost>("post",postSchema)