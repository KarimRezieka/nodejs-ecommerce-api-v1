const { default: slugify } = require('slugify');
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');
const subCategoryModel  = require('../models/subCategoryModel');

exports.setCategoryIdToBody=(req,res,next) => {
    if(!req.body.category) req.body.category = req.params.categoryId;
    next();
}


exports.createSubCategory = asyncHandler(async(req,res)=>{
    const {name,category} = req.body;

    const subCategory = await subCategoryModel.create({
        name
        ,slug:slugify(name)
        ,category,
    });
    res.status(201).json({data:subCategory})
})

exports.getSubCategories = asyncHandler(async(req,res)=>{
    const page =req.query.page *1 || 1;
    const limit =req.query.limit *1|| 5;
    const skip = (page-1) * limit ;

    let filterObject ={};
    if(req.params.categoryId) filterObject={
        category:req.params.categoryId
    }

    const subCategories= await subCategoryModel.find(filterObject)
    .skip(skip).limit(limit).populate({path:'category',select:'name -_id'})
    res.status(200).json({result:subCategories.length,page,data:subCategories});
});

exports.getSubCategory = asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const Subcategory = await subCategoryModel.findById(id);
    if(!Subcategory){
    return  next(new ApiError(`No SubCategory Find for this ID ${id}`,404))
    }
     res.status(200).json({data:Subcategory})
})
exports.updateSubCategory = asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const {name}=req.body;
    const {category}=req.body;
    const Subcategory = await subCategoryModel.findOneAndUpdate(
        {_id:id}
        ,{name,slug:slugify(name),category}
        ,{new:true});
    if(!Subcategory){
    return  next(new ApiError(`No Category Find for this ID ${id}`,404))
    }
     res.status(200).json({data:Subcategory});
})  
exports.deleteSubCategory = asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const Subcategory = await subCategoryModel.findOneAndDelete({_id:id});
    if(!Subcategory){
    return next(new ApiError(`No Category Find for this ID ${id}`,404))
    }
    res.status(204).send()
})