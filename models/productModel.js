const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    slug: {
      type: String,
      required: true,
      lowrcase: true,
    },
    description: {
      type: String,
      required: [true, "Prodcut description is required"],
      minlength: [20, "Too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Prodcut quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Prodcut price is required"],
      trim: true,
      maxlength: [20, "Too Long Product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    images: [String],
    imageCover: {
      type: String,
      required: [true, "Prodcut Image Cover Is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },
    subcategory: [{ type: mongoose.Schema.ObjectId, ref: "SubCategory" }],
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'Brand',

    },
    ratingsAverage:{
        type:Number,
        min:[1,'Rating must be above or equal 1.0'],
        max:[5,'Rating must be below or equal 5.0']
    },
    ratingsQuantity:{
        type:Number,
        default:0,
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model ('Prodcut',productSchema)
