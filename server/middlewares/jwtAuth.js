import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const checkUserAuth = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        try {
            const token = authorizationHeader.split(' ')[1];
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.user = await UserModel.findById(userID).select('-password');
            next();
        } catch (error) {
            res.status(401).json({
                status: false,
                message: error.message
            });
        }
    } else {
        res.status(401).json({
            status: false,
            message: "Authorization header missing"
        });
    }
};

export default checkUserAuth;
