const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const subCategoryModel = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};


exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  let filterObject = {};
  if (req.params.categoryId)
    filterObject = {
      category: req.params.categoryId,
    };

  const subCategories = await subCategoryModel
    .find(filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ result: subCategories.length, page, data: subCategories });
});


// @desc    Get Spacific of Subcategory
// @route   GET /api/v1/subcategories:id
// @access  Public
exports.getSubCategory = factory.getOne(subCategoryModel)

// @desc    Update Spacific of Subcategory
// @route   PUT /api/v1/subcategories:id
// @access  Private
exports.updateSubCategory = factory.updateOne(subCategoryModel);


// @desc    Create Subcategory
// @route   POST /api/v1/subcategories
// @access  Private
exports.createSubCategory = factory.createOne(subCategoryModel);

// @desc    Delete Spacific of Subcategory
// @route   PUT /api/v1/subcategories:id
// @access  Private
exports.deleteSubCategory = factory.deleteOne(subCategoryModel);
