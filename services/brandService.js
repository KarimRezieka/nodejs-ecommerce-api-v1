const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const brandModel = require("../models/brandModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require("./handlersFactory");

// @desc    Get List of Products
// @route   GET /api/v1/Products
// @access  Public
exports.getBrands = factory.getAll(brandModel);

// @desc    Get Spacific of Brand
// @route   GET /api/v1/brands:id
// @access  Public
exports.getBrand = factory.getOne(brandModel);

// @desc    Update Spacific of Brand
// @route   PUT /api/v1/brands:id
// @access  Private
exports.updataBrand = factory.updateOne(brandModel);

// @desc    Create Brand
// @route   POST /api/v1/brands
// @access  Private
exports.createBrand = factory.createOne(brandModel);

// @desc    Delete Spacific of Brand
// @route   PUT /api/v1/Brand:id
// @access  Private
exports.deleteBrand = factory.deleteOne(brandModel);
