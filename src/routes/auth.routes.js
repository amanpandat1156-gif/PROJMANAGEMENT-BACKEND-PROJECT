
    import { Router } from "express";
    import {
      changeCurrentPassword,
      forgotPasswordRequest,
      getCurrentUser,
      login,
      logoutUser,
      refreshAccessToken,
      registerUser,
      resendEmailVerification,
      resetForgotPassword,
      verifyEmail,
    } from "../controllers/auth.controllers.js";
    import { validate } from "../middlewares/validator.middleware.js";
    import {
      userChangeCurrentPasswordValidator,
      userForgotPasswordValidator,
      userLoginValidator, // Ensure validators/index.js me bhi Capital 'L' ho
      userRegisterValidator,
      userResetForgotPasswordValidator,
    } from "../validators/index.js";
    import { verifyJWT } from "../middlewares/auth.middleware.js";

    const router = Router();

    // Unsecured routes
    router.route("/register").post(userRegisterValidator(), validate, registerUser);
    router.route("/login").post(userLoginValidator(), validate, login);
    router.route("/verify-email/:verificationToken").get(verifyEmail);
    router.route("/refresh-token").post(refreshAccessToken);
    router
      .route("/forgot-password")
      .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
    router
      .route("/reset-password/:resetToken")
      .post(userResetForgotPasswordValidator(), validate, resetForgotPassword);

    // Secure routes
    router.route("/logout").post(verifyJWT, logoutUser).get(verifyJWT, logoutUser);
    router.route("/current-user").get(verifyJWT, getCurrentUser); // Changed to GET
    router
      .route("/change-password")
      .post(
        verifyJWT,
        userChangeCurrentPasswordValidator(),
        validate,
        changeCurrentPassword,
      );
    router
      .route("/resend-email-verification")
      .post(verifyJWT, resendEmailVerification);

    export default router;

    