const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const {
  registerSchema,
  loginSchema,
  refreshSchema,
  passwordSchema,
  resendEmailSchema,
  googleLoginSchema,
} = require("../../schemas");



const ctrl = require("../../controllers");

const router = express.Router();

router.post("/signup", validateBody(registerSchema), ctrlWrapper(ctrl.register));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify", validateBody(resendEmailSchema), ctrlWrapper(ctrl.resendEmail));

router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));

router.post("/googleLogin", validateBody(googleLoginSchema), ctrlWrapper(ctrl.googleLogin));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.post("/refresh", validateBody(refreshSchema), ctrlWrapper(ctrl.refresh));

router.get("/key/:email", ctrlWrapper(ctrl.sendKey));

router.get("/verifyKey/:key", ctrlWrapper(ctrl.verifyKey));

router.patch("/password", validateBody(passwordSchema), ctrlWrapper(ctrl.saveNewPassword));

module.exports = router;