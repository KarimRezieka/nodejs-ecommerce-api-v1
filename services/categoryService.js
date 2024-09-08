const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const CategoryModel = require("../models/categoryModel");
const factory = require("./handlersFactory");
const {uploadSingleImage} = require('../middleware/uploadImageMiddlware')

// Upload single Image 
exports.uploadCategoryImage = uploadSingleImage('image')

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);
    req.body.image = filename;
  next();
});

// @desc    Get List of Products
// @route   GET /api/v1/Products
// @access  Public
exports.getCategories = factory.getAll(CategoryModel);

// @desc    Get Spacific of Category
// @route   GET /api/v1/categories:id
// @access  Public
exports.getCategory = factory.getOne(CategoryModel);

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
