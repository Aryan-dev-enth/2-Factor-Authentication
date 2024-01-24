import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/jwtAuth.js';
// Public routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);

// Email verification route
router.get("/verify", UserController.verifyEmail);
router.get("/resetPassword", UserController.resetPassword)

// Private routes
router.post("/changePassword",checkUserAuth, UserController.changePassword);
router.get("/getUser", checkUserAuth, UserController.getUser);


export default router;
