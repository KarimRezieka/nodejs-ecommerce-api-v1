const asyncHandler = require("express-async-handler");
const sharp = require('sharp');
const { v4: uuidv4 } = require("uuid");
const brandModel = require("../models/brandModel");
const {uploadSingleImage} = require('../middleware/uploadImageMiddlware')

const factory = require("./handlersFactory");

// Upload single Image 
exports.uploadBrandImage = uploadSingleImage('image')

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);
    req.body.image = filename;
  next();
});

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
