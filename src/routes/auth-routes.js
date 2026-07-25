import { Router } from "express";
import { login, registerUser, logoutUser, refreshAccessToken, verifyEmail, forgotPasswordRequest, resetPassword } from "../controllers/auth-controller.js";
import { validate } from "../middlewares/validator-middleware.js"
import { userRegisterValidator, userLoginValidator, userForgotPasswordRequestValidator, userResetForgotPasswordValidator, userChangePasswordValidator } from "../validators/index.js"
import { verifyJWt } from "../middlewares/auth-middleware.js";


const router = Router();

// public routes
router.route("/register").post(userRegisterValidator(), validate, registerUser)
router.route("/login").post(userLoginValidator(), validate, login)
router.route("/verify-email/:verificationToken").get(verifyEmail)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/forgot-password-request").post(userForgotPasswordRequestValidator(), validate, forgotPasswordRequest)
router.route("/reset-password/:resetToken").post(userResetForgotPasswordValidator(), validate, resetPassword)

// secure routes
router.route("/logout").post(verifyJWt, logoutUser)
router.route("/current-user").post(verifyJWt, getCurrentUser)
router.route("/resent-email-verification").post(verifyJWt, resentEmailVerification)
router.route("/change-password").post(verifyJWt, userChangePasswordValidator(), validate, changedPassword)


export default router;