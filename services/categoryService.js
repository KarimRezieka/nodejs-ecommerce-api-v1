const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require('./handlersFactory')

exports.getCategories = asyncHandler(async (req, res) => {
  const DoucmentCount = await CategoryModel.countDocuments();
  console.log(DoucmentCount);
  // Initialize ApiFeatures with a Mongoose query object
  const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
    .filter()
    .search()
    .limitingFields()
    .sort()
    .paginate(DoucmentCount);
  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;

  res
    .status(200)
    .json({ result: categories.length, paginationResult, data: categories });
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`No Category Find for this ID ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
exports.updataCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name: name },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`No Category Find for this ID ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc    Update Spacific of Category
// @route   PUT /api/v1/Category:id
// @access  Private
exports.createCategory = factory.updateOne(CategoryModel);

// @desc    Delete Spacific of Category
// @route   PUT /api/v1/Category:id
// @access  Private
exports.deleteCategory = factory.deleteOne(CategoryModel);