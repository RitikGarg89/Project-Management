import { Router } from "express";
import { login, registerUser, logoutUser } from "../controllers/auth-controller.js";
import { validate } from "../middlewares/validator-middleware.js"
import { userRegisterValidator, userLoginValidator } from "../validators/index.js"
import { verifyJWt } from "../middlewares/auth-middleware.js";


const router = Router();

// public routes
router.route("/register").post(userRegisterValidator(), validate, registerUser)
router.route("/login").post(userLoginValidator(), validate, login)
// secure routes
router.route("/logout").post(verifyJWt(), logoutUser)


export default router;