const { body } = require('express-validator');
const express = require('express');
const { 
    getCategories,
    createCategory,
    getCategory,
    updataCategory ,
    deleteCategory
} = require('../services/categoryService');
const { updateMany } = require('../models/categoryModel');
const { getCategoryValidator 
        ,createCategoryValidator
        ,updateCategoryValidator
        ,deleteCategoryValidator
}= require('../utils/validators/categoryValidator');
const subCategoryRoute = require('./subCategoryRoute');

const router = express.Router();

router.use('/:categoryId/subcategories',subCategoryRoute)

router.route('/')
.get(getCategories)
.post(createCategoryValidator,createCategory);
router.route('/:id')
.get(getCategoryValidator,getCategory)
.put(updateCategoryValidator,updataCategory)
.delete(deleteCategoryValidator,deleteCategory); 
module.exports = router;
