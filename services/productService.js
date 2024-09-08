const asychandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { uploadMultiImages } = require("../middleware/uploadImageMiddlware");
const ProdcutModel = require("../models/productModel");
const factory = require("./handlersFactory");

exports.uploadProductImages = uploadMultiImages("imageCover", "images");

exports.resizeProductImages = asychandler(async (req, res, next) => {
  const ImageCoverFileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.files.imagecover[0].buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${ImageCoverFileName}`);
  req.body.imagecover = ImageCoverFileName;
  next();
});
// @desc    Get List of Products
// @route   GET /api/v1/Products
// @access  Public
exports.getProducts = factory.getAll(ProdcutModel);

// @desc    Get Spacific of Products
// @route   GET /api/v1/Products:id
// @access  Public
exports.getProduct = factory.getOne(ProdcutModel);

// @desc    Update Spacific of Prodcut
// @route   PUT /api/v1/Products:id
// @access  Private
exports.updataProduct = factory.updateOne(ProdcutModel);

// @desc    Create Procut
// @route   POST /api/v1/Products
// @access  Private
exports.createProduct = factory.createOne(ProdcutModel);

// @desc    Delete Spacific of Prodcut
// @route   PUT /api/v1/Products:id
// @access  Private
exports.deleteProduct = factory.deleteOne(ProdcutModel);
