const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { token } = require("morgan");
const ApiError = require("../utils/apiError");
const sendEmail = require("../utils/sendEmail");
const createToken = require("../utils/createToken");


//@desc Signup
//@route POST /api/v1/auth/signup
//@access Public
exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  //2)) generate the jwt
  // eslint-disable-next-line no-shadow
  const token = createToken(user._id);

  res.status(201).json({ data: user, token });
});

//@desc Login
//@route POST /api/v1/auth/login
//@access Public

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || (await bcrypt.compare(req.body.password, user.password))) {
    return next(new Error("Incorrect email or passsowrd"));
  }
  //2)) generate the jwt
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

//@desc amke sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  // eslint-disable-next-line no-shadow
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    return next(
      new ApiError(
        "Your are not login, please login to get access this route",
        401
      )
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);

  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError("the User that belong to this token does no longer Exist")
    );
  }

  if (currentUser.passwordChangedAt) {
    const passChangedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passChangedTimeStamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password , please login again",
          401
        )
      );
    }
  }
  req.user = currentUser;
  next();
});

//@desc  Authorization (User Permissions)
//["admin","manager"]
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(
        new ApiError("your are not allowed to access this route ", 403)
      );
    }
    next();
  });

//@desc   Forgot Password
//@route  POST /api/v1/auth/forgotPassword
//@access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("You Must SignUp first", 404));
  }
  // 2) If user exist ,Generate random 6 digits and save it in db
  if (user) {
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    const hashedResetCode = crypto
      .createHash("shs256")
      .update(resetCode)
      .digest("hex");
  }
  //Save hased Password into db
  // eslint-disable-next-line no-undef
  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResteVerfied = false;
  user.save();

  const message = `HI ${user.name} we received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. `;
  //3) send this reste code via email
  try {
    await sendEmail({
      email: user.email,
      subject: "YOUR password resed code(vailed for 10 min)",
      message: message,
    });
  } catch (errr) {
    user.passwordResetCode = undefined;
    user.passwordResteVerfied = undefined;
    user.passwordResetExpired = undefined;
    await user.save();
    return next(new ApiError("there is and error in sending email", 500));
  }
  next();
});

//@desc   verfiy password reset code
//@route  POST /api/v1/auth/verfiyResetCode
//@access Public
exports.verfiyPassResetCode = asyncHandler(async (req, res, next) => {
  //1) Get user Based on reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");
  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("reset code invalid or expired"));
  }
  user.passwordResteVerfied = true;
  await user.save();
  res.status(200).json({ states: "success" });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }
  if (!user.passwordResteVerfied) {
    return next(new ApiError("Reset code not verfied", 400));
  }
  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResteVerfied = undefined;
  user.passwordResetExpired = undefined;

  await user.save();

  // generate new token
  // eslint-disable-next-line no-shadow
  const token =  createToken (user._id);
  res.status(200).json({token})
});
