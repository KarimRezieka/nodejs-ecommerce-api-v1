const { body } = require("express-validator");
const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  verfiyPassResetCode,
  resetPassword,
} = require("../services/authService");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();
router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPassword);
router.post("/verfiyResetCode", verfiyPassResetCode);
router.post("/resetPassword", resetPassword);

module.exports = router;
