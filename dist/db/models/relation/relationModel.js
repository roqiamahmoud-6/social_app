import mongoose, { Types } from "mongoose";
const relationSchema = new mongoose.Schema({
    follower: {
        type: Types.ObjectId,
        required: true,
        ref: "auth"
    },
    following: {
        type: Types.ObjectId,
        required: true,
        ref: "auth"
    },
}, {
    timestamps: true,
    strictQuery: true
});
export const relationModel = mongoose.models.relation || mongoose.model("relation", relationSchema);
//# sourceMappingURL=relationModel.js.map