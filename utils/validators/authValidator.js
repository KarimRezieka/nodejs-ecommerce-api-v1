const { param, check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");


exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("User Requird")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .isLength({ max: 32 })
    .withMessage("Too long User name"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check("email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .notEmpty()
    .withMessage("Email Required")
    .custom((val) => {
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
        return true ;
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
  .custom((password, { req }) => {
    if (password !== req.passwordConfirm) {
      throw new Error("Password Confirm incorrect");
    }
  return true
  }),
  check("passwordConfirm").notEmpty().withMessage("Password Confirm required"),
  validatorMiddleware,
];

exports.loginValidator = [

  check("email")
    .isEmail()
    .withMessage("Invalid Email Address")
    .notEmpty()
    .withMessage("Email Required")
    .custom((val) => {
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
        return true;
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  ]
