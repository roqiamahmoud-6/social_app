import jwt from "jsonwebtoken";
import { secret_key } from "../../config/env.servie.js";
import authrepo from "../auth/auth.repo.js";
import AppError from "../../common/utilis/globalErrorHandling.js";
import { Encrypt } from "../../db/security/encryption.js";
import { privacy } from "../../common/utilis/enum.js";
import relationRepo from "../relation/relation.repo.js";
import { successResponse } from "../../common/utilis/successREsponce.js";
const db = new authrepo;
const relation = new relationRepo;
class userService {
    constructor() { }
    getMyProfile = successResponse(async (req, res, next) => {
        try {
            const { token } = req.headers;
            if (!token) {
                return res.status(401).json({ message: "you must send token" });
            }
            const decoded = jwt.verify(token, secret_key);
            if (!decoded?.id) {
                return res.status(401).json({ message: "invalid token" });
            }
            const user = await db.findbyid({
                id: decoded.id,
                options: {
                    _id: 1,
                    fname: 1,
                    lname: 1,
                    email: 1,
                    gender: 1,
                    profileImage: 1,
                    phone: 1
                }
            });
            if (!user) {
                return res.status(404).json({ message: "user not exist" });
            }
            return { data: user };
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    });
    updateProfile = successResponse(async (req, res, next) => {
        try {
            const { token } = req.headers;
            if (!token) {
                return res.status(401).json({ message: "you must send token" });
            }
            const { fname, lname, email, gender, profileImage, phone } = req.body;
            const decoded = jwt.verify(token, secret_key);
            if (!decoded?.id) {
                return res.status(401).json({ message: "invalid token" });
            }
            const updateQuery = {};
            if (fname !== undefined) {
                updateQuery.fname = fname;
            }
            if (email !== undefined) {
                updateQuery.email = email;
            }
            if (lname !== undefined) {
                updateQuery.lname = lname;
            }
            if (gender !== undefined) {
                updateQuery.gender = gender;
            }
            if (profileImage !== undefined) {
                updateQuery.profileImage = profileImage;
            }
            if (phone !== undefined) {
                updateQuery.phone = Encrypt(phone);
            }
            const user = await db.findByIdAndUpdate({
                id: decoded.id,
                updateData: updateQuery,
                options: {
                    _id: 1,
                    fname: 1,
                    lname: 1,
                    email: 1,
                    gender: 1,
                    profileImage: 1,
                    phone: 1
                }
            });
            if (!user) {
                return res.status(404).json({ message: "user not exist" });
            }
            return {
                message: "updated successfully",
                data: user
            };
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    });
    follow = successResponse(async (req, res, next) => {
        try {
            const { token } = req.headers;
            const { id_user } = req.params;
            if (!token) {
                return res.status(401).json({ message: "you must send token" });
            }
            const decoded = jwt.verify(token, secret_key);
            if (!decoded?.id) {
                return res.status(401).json({ message: "invalid token" });
            }
            const user = await db.findbyid({
                id: decoded.id
            });
            if (!user) {
                return res.status(404).json({ message: "user not exist" });
            }
            const user2 = await db.findbyid({
                id: id_user
            });
            if (!user2) {
                return res.status(404).json({ message: "user that you search about him not exist" });
            }
            if (user._id === user2._id) {
                throw new AppError("not allow to follow your self", 400);
            }
            const r_exist = await relation.find({
                condition: {
                    follower: user._id,
                    following: user2._id
                }
            });
            if (r_exist) {
                throw new AppError("relation already exist", 400);
            }
            const r = await relation.create({
                data: {
                    follower: user._id,
                    following: user2._id
                }
            });
            res.status(201).json("follow successfully");
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    });
    unfollow = successResponse(async (req, res, next) => {
        try {
            const { token } = req.headers;
            const { id_user } = req.params;
            if (!token) {
                return res.status(401).json({ message: "you must send token" });
            }
            const decoded = jwt.verify(token, secret_key);
            if (!decoded?.id) {
                return res.status(401).json({ message: "invalid token" });
            }
            const user = await db.findbyid({ id: decoded.id });
            if (!user) {
                return res.status(404).json({ message: "user not exist" });
            }
            const user2 = await db.findbyid({
                id: id_user
            });
            if (!user2) {
                return res.status(404).json({ message: "user that you search about him not exist" });
            }
            const r_exist = await relation.find({
                condition: {
                    follower: user._id,
                    following: user2._id
                }
            });
            if (!r_exist) {
                throw new AppError("relation not exist", 404);
            }
            await relation.deleteone({
                data: {
                    follower: user._id,
                    following: user2._id
                }
            });
            return res.status(200).json({ message: "unfollow successfully" });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    });
    userSearch = successResponse(async (req, res, next) => {
        try {
            const { token } = req.headers;
            const { fname } = req.query;
            if (!token) {
                return res.status(401).json({ message: "you must send token" });
            }
            const decoded = jwt.verify(token, secret_key);
            if (!decoded?.id) {
                return res.status(401).json({ message: "invalid token" });
            }
            const user = await db.findbyid({ id: decoded.id });
            if (!user) {
                return res.status(404).json({ message: "user not exist" });
            }
            const result = await db.findall({
                condition: { fname },
                projection: {
                    fname: 1,
                    lname: 1,
                    email: 1,
                    gender: 1,
                    phone: 1,
                    profileImage: 1,
                }
            });
            res.status(200).json({ result });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    });
    suggestion = successResponse(async (req, res, next) => {
        try {
            const { token } = req.headers;
            if (!token) {
                return res.status(401).json({ message: "you must send token" });
            }
            const decoded = jwt.verify(token, secret_key);
            if (!decoded?.id) {
                return res.status(401).json({ message: "invalid token" });
            }
            const user = await db.findbyid({ id: decoded.id });
            if (!user) {
                return res.status(404).json({ message: "user not exist" });
            }
            const myRelation = await relation.findall({
                condition: { follower: user._id },
                projection: { following: 1 }
            });
            let suggestion = [];
            for (const r of myRelation) {
                const relationUsers = await relation.findall({
                    condition: { follower: r.following },
                    projection: { following: 1 }
                });
                for (const item of relationUsers) {
                    suggestion.push(item.following);
                }
            }
            res.status(200).json({ suggestion });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    });
    privateACC = successResponse(async (req, res, next) => {
        try {
            const { token } = req.headers;
            if (!token) {
                return res.status(401).json({ message: "you must send token" });
            }
            const decoded = jwt.verify(token, secret_key);
            if (!decoded?.id) {
                return res.status(401).json({ message: "invalid token" });
            }
            const user = await db.findbyid({ id: decoded.id });
            if (!user) {
                return res.status(404).json({ message: "user not exist" });
            }
            if (user.privacy === privacy.private) {
                throw new AppError("account already private", 400);
            }
            await db.findByIdAndUpdate({
                id: user._id,
                updateData: { privacy: privacy.private }
            });
            res.status(200).json({ message: "account changed to private" });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    });
}
export default new userService();
//# sourceMappingURL=user.service.js.map