const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/ApiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findOneAndDelete({ _id: id });
    if (!document) {
      return next(new ApiError(`No document found for this ID ${id}`, 404));
    }
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const Document = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!Document) {
      return next(
        new ApiError(`No Document Find for this ID ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: Document });
  });

exports.createOne = (Model)=> asyncHandler(async (req, res) => {
    const Document = await Model.create(req.body);
    res.status(201).json({ data: Document });
  });

exports.getOne = (Model)=>asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const Document = await Model.findById(id);
    if (!Document) {
      return next(new ApiError(`No SubCategory Find for this ID ${id}`, 404));
    }
    res.status(200).json({ data: Document });
  });

  exports.getAll = (Model)=> asyncHandler(async (req, res) => {
    const DoucmentCount = await Model.countDocuments();
    console.log(DoucmentCount);
    // Initialize ApiFeatures with a Mongoose query object
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .filter()
      .search()
      .limitingFields()
      .sort()
      .paginate(DoucmentCount);
    const { mongooseQuery, paginationResult } = apiFeatures;
    const Documents = await mongooseQuery;
    res
      .status(200)
      .json({ result: Documents.length, paginationResult, data: Documents });
  });