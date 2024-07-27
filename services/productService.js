const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ProdcutModel = require("../models/productModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/ApiFeatures");
const factory = require("./handlersFactory");

// @desc    Get List of Products
// @route   GET /api/v1/Products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  try {
    const DoucmentCount = await ProdcutModel.countDocuments();
    console.log(DoucmentCount);
    // Initialize ApiFeatures with a Mongoose query object
    const apiFeatures = new ApiFeatures(ProdcutModel.find(), req.query)
      .filter()
      .search()
      .limitingFields()
      .sort()
      .paginate(DoucmentCount);

    // Execute Query
    const { mongooseQuery, paginationResult } = apiFeatures;

    // Uncomment if population is needed
    const Products = await mongooseQuery.populate({
      path: "category",
      select: "name -_id",
    });

    res
      .status(200)
      .json({ result: Products.length, paginationResult, data: Products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// @desc    Get Spacific of Products
// @route   GET /api/v1/Products:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Product = await ProdcutModel.findById(id).populate({
    path: "category",
    select: "name",
  });
  if (!Product) {
    return next(new ApiError(`No Product Find for this ID ${id}`, 404));
  }
  res.status(200).json({ data: Product });
});

// @desc    Update Spacific of Prodcut
// @route   PUT /api/v1/Products:id
// @access  Private
exports.updataProduct = factory.updateOne(ProdcutModel)

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
exports.deleteProduct = factory.deleteOne(ProdcutModel);
