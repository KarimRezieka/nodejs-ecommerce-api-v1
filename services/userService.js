const asyncHandler = require("express-async-handler");
const sharp = require('sharp');
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require("uuid");
const ApiError = require('../utils/apiError')
const User = require("../models/userModel");
const {uploadSingleImage} = require('../middleware/uploadImageMiddlware')
const createToken = require('../utils/createToken');
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
exports.updateUser =asyncHandler(async (req, res, next) => {
  const Document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name:req.body.name,
      slug:req.body.slug,
      phone:req.body.phone,
      email:req.body.email,
      profileImg:req.body.profileImg,
      role:req.body.role
    }
  );
  if (!Document) {
    return next(
      new ApiError(`No Document Find for this ID ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: Document });
});


exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const Document = await User.findByIdAndUpdate(
    req.params.id,
    {
     password:await bcrypt.hash(req.body.password),
     PasswordChangedAt:Date.now(),
    }
  );
  if (!Document) {
    return next(
      new ApiError(`No Document Find for this ID ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: Document });
});
// @desc    Create user
// @route   POST /api/v1/users
// @access  Private
exports.createUser = factory.createOne(User);

// @desc    Delete Spacific of user
// @route   Delete /api/v1/users/:id
// @access  Private
exports.deleteUser = factory.deleteOne(User);

// @desc    GET logged user password
// @route   GET /api/v1/users/getMe
// @access  Private/protect
exports.getLoggedUserData = asyncHandler(async(req,res,next)=>{
  // this is the important part 
  req.params.id = req.user._id
  next()
})

// @desc    Update logged user password
// @route   PUT /api/v1/users/updateMyPassword
// @access  Private/protect
exports.updateLoggedUserPassword = asyncHandler(async(req,res,next)=>{
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
     password:await bcrypt.hash(req.body.password),
     PasswordChangedAt:Date.now(),
    },{
      new:true,
    }
  );
  //2) Generate Token
  const token = createToken(user._id);

  res.status(200).json({ data: user });
})

// @desc    Update logged user Data
// @route   PUT /api/v1/users/updateMe
// @access  Private/protect
exports.UpdateLoggedUserData = asyncHandler(async(req,res,next)=>{
const updateUser = await User.findOneAndUpdate(req.user._id,{
  name:req.body.name,
  email:req.body.name,
  phone:req.body.phone,

},{
  new:true
})
})

// @desc    Deactivate logged user 
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/protect
exports.deleteLoggedUserData = asyncHandler(async(req,res,next)=>{
  await User.findByIdAndDelete(req.user._id,{active:false})
  res.status(204).json({status:'Sucess'})
})