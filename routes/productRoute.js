const { body } = require("express-validator");
const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updataProduct,
  deleteProduct,
} = require("../services/productService");

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const router = express.Router();

router.route("/").get(getProducts).post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updataProduct)
  .delete(deleteProduct, deleteProduct);

module.exports = router;
