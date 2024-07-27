const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const CategoryModel = require("../../models/categoryModel");
const SubCategoryModel = require("../../models/subCategoryModel");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 chars "),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number "),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Prodcut price is required")
    .isNumeric()
    .withMessage("Product price mustbe a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("Prodcut priceAfterDiscount must be a number")
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lowr than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("availableColors should be array of string"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("invalid ID")
    .custom((categoryId) => {
      CategoryModel.findById(categoryId).then((category) => {
        if (!category) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject(
            new Error(`No category for this Id ${categoryId}`)
          );
        }
      });
    }),
  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("invalid ID")
    .custom((SubCategoryId) => {
      SubCategoryModel.find({
        _id: { $exists: true, $in: SubCategoryId },
      }).then((SubCategory) => {
        if (
          SubCategory.length < 1 ||
          SubCategory.length !== SubCategoryId.length
        ) {
          return Promise.reject(new Error("Invalid SubCategories Ids"));
        }
      });
    })
    .custom((val, { req }) => {
      SubCategoryModel.find({ category: req.body.category }).then(
        (SubCategory) => {
          const subCategoriesIdsInDB = [];
          SubCategory.forEach((subCategory) => {
            subCategoriesIdsInDB(subCategory);
          });
          const checker = val.every((v) => subCategoriesIdsInDB.includes(v));
          console.log(checker);
        }
      );
    }),
  check("Brand").optional().isMongoId().withMessage("invalid ID"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a numer")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("raingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("raingsQuantity must be a number"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id formate"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id Formate"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Id Formate"),
  validatorMiddleware,
];
