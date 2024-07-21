const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ProdcutModel = require("../models/productModel");
const ApiError = require("../utils/apiError");

// @desc    Get List of Products
// @route   GET /api/v1/Products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const Products = await ProdcutModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ result: Products.length, page, data: Products });
});

// @desc    Get Spacific of Products
// @route   GET /api/v1/Products:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Product = await ProdcutModel.findById(id);
  if (!Product) {
    return next(new ApiError(`No Product Find for this ID ${id}`, 404));
  }
  res.status(200).json({ data: Product });
});

// @desc    Update Spacific of Prodcut
// @route   PUT /api/v1/Products:id
// @access  Private
exports.updataProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);
  const Product = await ProdcutModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!Product) {
    return next(new ApiError(`No Product Find for this ID ${id}`, 404));
  }
  res.status(200).json({ data: Product });
});

// @desc    Create Procut
// @route   POST /api/v1/Products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const Product = await ProdcutModel.create(req.body);
  res.status(201).json({ data: Product });
});

// @desc    Delete Spacific of Prodcut
// @route   PUT /api/v1/Products:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Product = await ProdcutModel.findOneAndDelete({ _id: id });
  if (!Product) {
    return next(new ApiError(`No Product Find for this ID ${id}`, 404));
  }
  res.status(204).send();
});
