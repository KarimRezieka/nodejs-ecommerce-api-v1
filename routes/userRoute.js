const { body } = require("express-validator");
const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  UpdateLoggedUserData,
  deleteLoggedUserData
} = require("../services/userService");
const {
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
  changeCurrentPasswordValidator,
  updateLoggedUserValidator
} = require("../utils/validators/userValidator");

const router = express.Router();

router.get("/getMe",getLoggedUserData,getUser)
router.put("/ChangeMyPassword",updateLoggedUserPassword)
router.put("/updateMe",updateLoggedUserValidator,UpdateLoggedUserData)
router.delete("/deleteMe",deleteLoggedUserData)

// i apply it when i want to apply a specific middlware to all routes
// router.use()
router
  .route("/")
  .get(getUsers)
  .post(createUserValidator, uploadUserImage, resizeImage, createUser);

router.put("/changepassword/:id", changeCurrentPasswordValidator,changeUserPassword);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);
module.exports = router;
