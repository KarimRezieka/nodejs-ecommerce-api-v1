const express = require('express');
const { 
    getCategories,
    createCategory,
    getCategory,
    updataCategory ,
    deleteCategory
} = require('../services/categoryService');
const { updateMany } = require('../models/categoryModel');
const { body } = require('express-validator');
const { getCategoryValidator 
        ,createCategoryValidator
        ,updateCategoryValidator
        ,deleteCategoryValidator
    } = require('../utils/validators/categoryValidator');
const router = express.Router();
router.route('/')
.get(getCategories)
.post(createCategoryValidator,createCategory);
router.route('/:id')
.get(getCategoryValidator,getCategory)
.put(updateCategoryValidator,updataCategory)
.delete(deleteCategoryValidator,deleteCategory); 
module.exports = router;
