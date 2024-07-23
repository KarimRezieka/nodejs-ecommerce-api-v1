const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ProdcutModel = require("../models/productModel");
const ApiError = require("../utils/apiError");

// @desc    Get List of Products
// @route   GET /api/v1/Products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  // 1)) pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  // 2)) Filtering
  const queryStringObj = { ...req.query };
  const excludesFields = ["page", "sort", "limit", "fields"];
  excludesFields.forEach((field) => {
    delete queryStringObj[field];
  });
        // Appling [gte,gt,lte,lt]
  let queryStr = JSON.stringify(queryStringObj);
        //add $ befor gte ,.....
  queryStr = queryStr.replace(/(gte|gt|lte|lt)\b/g,match=>`$${match}`)
  console.log(queryStr)
  console.log(JSON.parse(queryStr))
  console.log(queryStringObj);

  // 3)) Sorting 
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ')
    if(sortBy){
      mongooseQuery=mong;ooseQuery.sort(sortBy)
    }else{
      mongooseQuery=mong;ooseQuery.sort('-createdAt')
    }
  }
  // Build Query
  const mongooseQuery = ProdcutModel.find(JSON.parse(queryStr))
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  // Execute Query 
  const Products = await mongooseQuery ;
  res.status(200).json({ result: Products.length, page, data: Products });
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
