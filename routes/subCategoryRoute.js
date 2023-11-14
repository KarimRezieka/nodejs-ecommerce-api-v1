const express= require('express')
const {createSubCategory
        ,setCategoryIdToBody
        ,getSubCategories
        ,getSubCategory 
        ,updateSubCategory
        ,deleteSubCategory  
}=require('../services/subCategoryService')
const{createSubCategoryValidator
    ,getSubCategoryValidator
    ,updateSubCategoryValidator
    ,deleteSubCategoryValidator
}=require('../utils/validators/subCategoryValidator copy')

const router = express.Router({mergeParams: true});

router.route('/').post(setCategoryIdToBody,createSubCategoryValidator,createSubCategory).get(getSubCategories)

router.route('/:id')
.get(getSubCategoryValidator,getSubCategory)
.put(updateSubCategoryValidator,updateSubCategory)
.delete(deleteSubCategoryValidator,deleteSubCategory)

module.exports = router;