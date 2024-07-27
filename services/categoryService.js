const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const CategoryModel = require("../models/categoryModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require("./handlersFactory");

// @desc    Get List of Products
// @route   GET /api/v1/Products
// @access  Public
exports.getCategories = factory.getAll(CategoryModel)

// @desc    Get Spacific of Category
// @route   GET /api/v1/categories:id
// @access  Public
exports.getCategory = factory.getOne(CategoryModel)

// @desc    Update Spacific of Category
// @route   PUT /api/v1/categories:id
// @access  Private
exports.updataCategory = factory.updateOne(CategoryModel);

// @desc    Create Category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(CategoryModel);

// @desc    Delete Spacific of Category
// @route   PUT /api/v1/categories:id
// @access  Private
exports.deleteCategory = factory.deleteOne(CategoryModel);
