import mongoose from "mongoose";
import { gender, privacy } from "../../../common/utilis/enum.js";
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    lname: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Object.values(gender),
        default: gender.male
    },
    privacy: {
        type: String,
        enum: Object.values(privacy),
        default: privacy.public
    },
    phone: String,
    profileImage: String,
}, {
    timestamps: true,
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
export const userModel = mongoose.models.user || mongoose.model("user", userSchema);
//# sourceMappingURL=user.mode.js.map