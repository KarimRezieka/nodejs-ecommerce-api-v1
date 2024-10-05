const { param, check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

exports.getUserValidator = [
  param("id").isMongoId().withMessage("Inavalid User ID"),
  validatorMiddleware,
];

exports.createUserValidator = [
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
    }),
  check("passwordConfirm").notEmpty().withMessage("Password Confirm required"),
  check("profileImag").optional(),
  check("phone").optional().isMobilePhone(["ar-EG", "ar-SA"]),
  check("role").optional(),
  validatorMiddleware,
];
exports.updateUserValidator = [
  param("id").isMongoId().withMessage("Inavalid User ID"),
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
      });
    }),
  check("profileImag").optional(),
  check("phone").optional().isMobilePhone(["ar-EG", "ar-SA"]),
  check("role").optional(),
  validatorMiddleware,
];
exports.deleteUserValidator = [
  param("id").isMongoId().withMessage("Inavalid User ID"),
  validatorMiddleware,
];

exports.changeCurrentPasswordValidator = [
  param("id").isMongoId().withMessage("Inavalid User ID"),
  body("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  body("passwordConfirm").notEmpty("You must enter the password confirm"),
  body("password")
    .notEmpty()
    .withMessage("You must enter new password")
    .custom(async (val, { req }) => {
      const user = await User.findById(req.params.id);
      const isCorrectPassword = bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }
      if (val === isCorrectPassword) {
        throw new Error("you must change the password");
      }

      // 2) verfiy password confirm
      if (val !== req.passwordConfirm) {
        throw new Error("Password Confirm incorrect");
      }
    }),
  validatorMiddleware,
];

exports.updateLoggedUserValidator = [
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
      });
    }),
  check("phone").optional().isMobilePhone(["ar-EG", "ar-SA"]),
  check("role").optional(),
  validatorMiddleware,
];