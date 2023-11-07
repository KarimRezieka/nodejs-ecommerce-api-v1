const express = require('express');
const { 
    getCategories,
    createCategory,
    getCategory,
    updataCategory ,
    deleteCategory
} = require('../services/categoryService');
const { updateMany } = require('../models/categoryModel');
const router = express.Router();
router.route('/')
.get(getCategories)
.post(createCategory);
router.route('/:id')
.get(getCategory)
.put(updataCategory)
.delete(deleteCategory); 
module.exports = router;
