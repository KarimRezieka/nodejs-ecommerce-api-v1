const { param, check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.getSubCategoryValidator=
[param('id').isMongoId().withMessage("Inavalid SubCategory ID"),validatorMiddleware];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory Requird")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name"),
  check("category")
  .notEmpty()
  .withMessage("Category requird")
  .isMongoId()
  .withMessage("Inavalid Category ID"),
  validatorMiddleware,
];
exports.updateSubCategoryValidator = [
    param('id')
    .isMongoId()
    .withMessage("Inavalid SubCategory ID")
    ,validatorMiddleware
]
exports.deleteSubCategoryValidator = [
    param('id')
    .isMongoId()
    .withMessage("Inavalid SubCategory ID")
    ,validatorMiddleware
]
