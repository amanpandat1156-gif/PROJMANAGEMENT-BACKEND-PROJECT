import { Router } from "express";
import { registerUser, login, logoutUser } from "../controllers/auth.controllers.js"; // logoutUser add kiya
import { validate } from "../middlewares/validator.middleware.js";
import { userloginValidator, userRegisterValidator } from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userloginValidator(), validate, login); // yahan 'login' function add kiya
router.route("/logout").post(verifyJWT, logoutUser);

export default router;