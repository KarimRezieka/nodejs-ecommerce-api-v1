const { body } = require("express-validator");
const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updataProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages
} = require("../services/productService");

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const router = express.Router();

router.route("/").get(getProducts).post(uploadProductImages,resizeProductImages,createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updataProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
