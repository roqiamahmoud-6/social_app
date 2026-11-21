import authrepo from "./auth.repo.js";
import AppError from "../../common/utilis/globalErrorHandling.js";
import { Comparee, Hash } from "../../db/security/hashing.js";
import { Encrypt } from "../../db/security/encryption.js";
import redisService from "../../db/connection/connectionRedis.js";
import { generateOtp, sendEmail } from "../../common/utilis/sendEmail.js";
import { emailVerify } from "../../common/html/emailVerify.js";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { secret_key, secret_key_refresh } from "../../config/env.servie.js";
import { resetPasswordTemplate } from "../../common/html/resetPassword.js";
const db = new authrepo;
class AuthService {
    constructor() { }
    async signUp(req, res, next) {
        try {
            const { fname, lname, phone, password, Cpassword, email, role, gender, profileImage } = req.body;
            const emailExict = await db.find({ condition: { email } });
            if (emailExict) {
                throw new AppError("email already exist", 400);
            }
            const encryptedphone = Encrypt(phone) ? Encrypt(phone) : undefined;
            const hashhpass = await Hash(password);
            const hashhCpass = await Hash(Cpassword);
            const otp = generateOtp();
            const otpp = await redisService.setValue({
                key: `otp:${email}`,
                value: otp,
                ex: 5 * 60
            });
            await sendEmail({
                to: email,
                subject: "email verify",
                html: emailVerify(otp)
            });
            const user = await db.create({
                data: { fname, lname, phone: encryptedphone, Cpassword: hashhCpass, password: hashhpass, email, role, gender }
            });
            res.status(200).json({ message: "please check your email to complete email verify" });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    }
    async emailVerifiction(req, res, next) {
        try {
            const { otp, email } = req.body;
            const correctOtp = await redisService.getValue({
                key: `otp:${email}`
            });
            if (correctOtp !== otp) {
                throw new AppError("invalid otp !!", 400);
            }
            const userVerified = await db.find({
                condition: {
                    email,
                    emailVerify: true
                }
            });
            if (userVerified) {
                throw new AppError("already verified", 400);
            }
            const user = await db.findoneAndUPDATe({
                data: { email },
                updateData: { emailVerify: true }
            });
            if (!user) {
                throw new AppError("user not exist");
            }
            res.status(201).json({ message: "done", user });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await db.find({
                condition: { email }
            });
            if (!user) {
                throw new AppError("email not exist", 400);
            }
            const isValid = await Comparee(password, user.password);
            if (!isValid) {
                throw new AppError("invalid password", 400);
            }
            const tokenId = randomUUID();
            const access_token = jwt.sign({ id: user.id, email: user.email }, secret_key, {
                expiresIn: 120,
                jwtid: tokenId
            });
            const refresh_token = jwt.sign({ id: user.id }, secret_key_refresh, {
                expiresIn: "4d",
                jwtid: tokenId
            });
            res.status(200).json({ access_token, refresh_token });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { refresh_token } = req.headers;
            if (!refresh_token) {
                return res.status(401).json({ message: "token not exist" });
            }
            const decoded = jwt.verify(refresh_token, secret_key_refresh);
            if (!decoded?.id) {
                return res.status(404).json({ message: "invalid token" });
            }
            const user = await db.findbyid({
                id: decoded.id
            });
            if (!user) {
                return res.status(404).json({ message: "user not exist" });
            }
            const access_token = jwt.sign({ id: user.id, email: user.email }, secret_key, {
                expiresIn: 120
            });
            res.status(200).json({ access_token });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    }
    async revokeToken(req, res, next) {
        try {
            const { flag } = req.query;
            const { email } = req.body;
            const { access_token } = req.headers;
            if (!access_token) {
                return res.status(401).json({ message: "token not exist" });
            }
            const user = await db.find({
                condition: { email }
            });
            if (!user) {
                return res.status(404).json({ message: "user not exist" });
            }
            const decoded = jwt.verify(access_token, secret_key);
            if (!decoded?.id) {
                return res.status(404).json({ message: "invalid token" });
            }
            if (flag == "all") {
                await db.findoneAndUPDATe({
                    data: { email },
                    updateData: { changeCardintialAT: new Date() }
                });
                return res.status(200).json({ message: "logout for all devices done successfully" });
            }
            else {
                if (user.changeCardintialAT && user.changeCardintialAT.getTime() > decoded.iat * 1000) {
                    throw new Error("you logout you must login again");
                }
                const remainingTime = decoded.exp - Math.floor(Date.now() / 1000);
                if (remainingTime <= 0) {
                    throw new AppError("token expired", 401);
                }
                await redisService.setValue({
                    key: `revoke token :: ${user._id} :: ${decoded.jti}`,
                    value: decoded.jti,
                    ex: remainingTime
                });
                return res.status(200).json({ message: "Logout successfully" });
            }
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    }
    async forgetPassword(req, res, next) {
        try {
            const { email } = req.body;
            const user = await db.find({
                condition: {
                    email
                }
            });
            if (!user) {
                throw new Error("user not exist ");
            }
            const isblocked = await redisService.ttl({ key: `otpforgetPass:block:${email}` });
            if (isblocked > 0) {
                throw new Error(`you have been blocked`);
            }
            if (await redisService.ttl({ key: `otpforgetPass:${email}` }) > 0) {
                throw new Error(`you can resend otp after${await redisService.ttl({ key: `otpforgetPass:${email}` })} `);
            }
            if (isblocked < 0) {
                if (Number(await redisService.getValue({ key: `otpforgetPass:max:${email}` })) >= 3) {
                    await redisService.setValue({
                        key: `otpforgetPass:block:${email}`,
                        value: 1,
                        ex: 60 * 20
                    });
                    throw new Error("you have exceded the number of resend otp");
                }
            }
            const otp = await generateOtp();
            await redisService.setValue({
                key: `otpforgetPass:${email}`,
                value: otp,
                ex: 60 * 10
            });
            await sendEmail({
                to: email,
                subject: "Forget password",
                html: resetPasswordTemplate(otp)
            });
            await redisService.incr({ key: `otpforgetPass:max:${email}` });
            res.status(200).json({ message: "check your email" });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    }
    async resetPassword(req, res, next) {
        try {
            const { newPASS, otp, email } = req.body;
            const otpValue = await redisService.getValue({ key: `otpforgetPass:${email}` });
            if (!otpValue) {
                throw new Error("OTP expired or not found ");
            }
            if (!await Comparee(otp, otpValue)) {
                throw new Error("invalid otp");
            }
            const user = await db.findoneAndUPDATe({
                data: { email },
                updateData: {
                    password: await Hash(newPASS),
                    changeCardintialAT: new Date()
                }
            });
            if (!user) {
                throw new Error("user not exist");
            }
            await redisService.deleteKey({ key: `otpforgetPass:${email}` });
        }
        catch (err) {
            const error = err;
            res.status(400).json({ message: error.message, stack: error.stack });
        }
    }
}
export default new AuthService();
//# sourceMappingURL=auth.service.js.map