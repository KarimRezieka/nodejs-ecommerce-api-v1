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
} = require("../services/userService");
const {
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  createUserValidator,
  changeCurrentPasswordValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();
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
