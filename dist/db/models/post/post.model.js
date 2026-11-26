import mongoose, { Types } from "mongoose";
import { AllowEnum, AvailabilityEnum } from "../../../common/utilis/enum.js";
const postSchema = new mongoose.Schema({
    content: { type: String,
        required: function () {
            return !this?.attachments?.length;
        }
    },
    attachments: [String],
    folderId: { type: String, trim: true },
    createdBy: { type: Types.ObjectId, ref: "user", required: true },
    tags: [{ type: Types.ObjectId, ref: "user" }],
    likes: [{ type: Types.ObjectId, ref: "user" }],
    allowComment: { type: String, enum: AllowEnum, default: AllowEnum.allow },
    availability: { type: String, enum: AvailabilityEnum, default: AvailabilityEnum.public },
}, {
    timestamps: true,
    strictQuery: true
});
export const postModel = mongoose.models.post || mongoose.model("post", postSchema);
//# sourceMappingURL=post.model.js.map