const asyncHandler = require("express-async-handler");
const sharp = require('sharp');
const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");
const {uploadSingleImage} = require('../middleware/uploadImageMiddlware')

const factory = require("./handlersFactory");

// Upload single Image 
exports.uploadUserImage = uploadSingleImage('profileImg');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if(req.file){
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/users/${filename}`);
    req.body.profileImg = filename;}
  next();
});

// @desc    Get List of users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers = factory.getAll(User);

// @desc    Get Spacific of User
// @route   GET /api/v1/users/:id
// @access  Private
exports.getUser = factory.getOne(User);

// @desc    Update Spacific of user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.updateUser = factory.updateOne(User);

// @desc    Create user
// @route   POST /api/v1/users
// @access  Private
exports.createUser = factory.createOne(User);

// @desc    Delete Spacific of user
// @route   PUT /api/v1/users/:id
// @access  Private
exports.deleteUser = factory.deleteOne(User);
