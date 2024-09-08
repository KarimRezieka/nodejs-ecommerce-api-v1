const { param, check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const User = require("../../models/userModel");

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
  check('password')
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check('profileImag').optional(),
  check('phone').optional().isMobilePhone(['ar-EG','ar-SA']),
  check('role').optional(),
  validatorMiddleware,
];
exports.updateUserValidator = [
  param("id").isMongoId().withMessage("Inavalid User ID"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];
exports.deleteUserValidator = [
  param("id").isMongoId().withMessage("Inavalid User ID"),
  validatorMiddleware,
];
