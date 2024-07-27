const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ProdcutModel = require("../models/productModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require("./handlersFactory");

// @desc    Get List of Products
// @route   GET /api/v1/Products
// @access  Public
exports.getProducts = factory.getAll(ProdcutModel)

// @desc    Get Spacific of Products
// @route   GET /api/v1/Products:id
// @access  Public
exports.getProduct = factory.getOne(ProdcutModel)

// @desc    Update Spacific of Prodcut
// @route   PUT /api/v1/Products:id
// @access  Private
exports.updataProduct = factory.updateOne(ProdcutModel)

// @desc    Create Procut
// @route   POST /api/v1/Products
// @access  Private
exports.createProduct = factory.createOne(ProdcutModel)

// @desc    Delete Spacific of Prodcut
// @route   PUT /api/v1/Products:id
// @access  Private
exports.deleteProduct = factory.deleteOne(ProdcutModel);
