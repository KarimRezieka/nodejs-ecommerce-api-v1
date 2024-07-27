const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const brandModel = require("../models/brandModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getBrands = asyncHandler(async (req, res) => {
  const DoucmentCount = await brandModel.countDocuments();
  console.log(DoucmentCount);
  // Initialize ApiFeatures with a Mongoose query object
  const apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .filter()
    .search()
    .limitingFields()
    .sort()
    .paginate(DoucmentCount);
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;
  res
    .status(200)
    .json({ result: brands.length, paginationResult, data: brands });
});

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`No Category Find for this ID ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});
exports.updataBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name: name },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`No Category Find for this ID ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findOneAndDelete({ _id: id });
  if (!brand) {
    return next(new ApiError(`No Category Find for this ID ${id}`, 404));
  }
  res.status(204).send();
});
