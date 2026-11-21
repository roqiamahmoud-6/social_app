import mongoose from "mongoose";
import { gender, role } from "../../../common/utilis/enum.js";
const authSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    Cpassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(role)
    },
    gender: {
        type: String,
        enum: Object.values(gender),
        default: gender.male
    },
    phone: String,
    emailVerify: {
        type: Boolean,
        default: false
    },
    isonfirmed: Boolean,
    profileImage: String,
    changeCardintialAT: Date
}, {
    timestamps: true,
    strictQuery: true
});
export const authModel = mongoose.models.auth || mongoose.model("auth", authSchema);
//# sourceMappingURL=auth.model.js.map