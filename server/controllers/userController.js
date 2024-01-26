import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import sendVerificationEmail from "../utils/sendMail.js";

class UserController {

    static verifyEmail = async (req, res) => {
        try {
            const { token } = req.query;

            if (!token) {
                return res.json({
                    "status": false,
                    "message": "Token not provided"
                });
            }

            const user = await UserModel.findOne({ verificationToken: token });

            if (!user) {
                return res.json({
                    "status": false,
                    "message": "Invalid token"
                });
            }

            // Check if the user is already verified
            if (user.verified) {
                return res.json({
                    "status": false,
                    "message": "Email already verified"
                });
            }

            // Update user status and clear verification token
            user.verified = true;
            user.verificationToken = null;
            await user.save();

            return res.json({
                "status": true,
                "message": "Email verification successful"
            });
        } catch (error) {
            return res.json({
                "status": false,
                "message": error.message
            });
        }
    };

    static userRegistration = async (req, res) => {
        try {
            const { username, email, password, password_confirmation, createdAt, dob, gender } = req.body;

            const userExists = await UserModel.findOne({ email: email });

            if (userExists) {
                return res.json({
                    "status": false,
                    "message": "User with this email already exists, try signing in"
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(password, salt);

            const newUser = new UserModel({
                username,
                email,
                password: hashed_password,
                createdAt,
                dob,
                gender,
                verified: false
            });

            const savedUser = await newUser.save();

            // Generate and save verification token
            const verificationToken = uuidv4();
            savedUser.verificationToken = verificationToken;
            await savedUser.save();

            // Send verification email
            await sendVerificationEmail(email, verificationToken);


            const token = jwt.sign({ userID: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            return res.json({
                "status": true,
                "message": "User created successfully,proceed for email verification on the link sent to your email",
                "token": token
            });

        } catch (error) {
            return res.json({
                "status": false,
                "message": error.message
            });
        }
    }

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (email && password) {
                const user = await UserModel.findOne({ email: email });
                if (user) {
                    const isMatch = await bcrypt.compare(password, user.password);

                    if (isMatch) {
                        if (!user.verified) {
                            const verificationToken = uuidv4();
                            user.verificationToken = verificationToken;
                            await user.save();

                            // Send verification email
                            await sendVerificationEmail(email, verificationToken);

                            res.send({
                                "status": false,
                                "message": "Email verification required to login"
                            });
                        }
                        else {
                            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                            res.json({
                                "status": true,
                                "message": "User logged in successfully",
                                "token": token
                            });
                        }
                    } else {
                        return res.json({
                            "status": false,
                            "message": "Authentication failed"
                        });
                    }
                } else {
                    return res.json({
                        "status": false,
                        "message": "User not found, try registering first"
                    });
                }
            } else {
                return res.json({
                    "status": false,
                    "message": "All fields required"
                });
            }
        } catch (error) {
            return res.json({
                "status": false,
                "message": error.message
            });
        }
    }

    static changePassword = async (req, res) => {
        const { password, password_confirmation } = req.body;
        if (password && password_confirmation) {
            if (password === password_confirmation) {
                const salt = await bcrypt.genSalt(10);
                const new_hashed_password = await bcrypt.hash(password, salt);
                await UserModel.findByIdAndUpdate(req.user._id, {
                    $set: {
                        password: new_hashed_password
                    }
                });
                res.json({
                    "status": true,
                    "message": "Password changed succesfully"
                });
            }
            else {
                res.json({
                    "status": false,
                    "message": "Password and confirm password does not match"
                });
            }
        }
        else {
            res.json({
                "status": false,
                "message": "All fields required"
            });
        }

    }

    static getUser = async (req, res) => {
        res.json({
            status: true,
            data: req.user,
            message: "success"
        })
    }

    static resetPassword = async (req, res) => {
        const { email } = req.body;
        if (email) {
            const user = await UserModel.findOne({ email: email });
            if (user) {
                const verificationToken = uuidv4();
                user.verificationToken = verificationToken;
                await user.save();
                await sendVerificationEmail(email, token);
            }
            else {
                res.json({
                    "status": false,
                    "message": "User not registered"
                });
            }
        }
        else {
            res.json({
                "status": false,
                "message": "All fields required"
            });
        }

    }
}

export default UserController;
