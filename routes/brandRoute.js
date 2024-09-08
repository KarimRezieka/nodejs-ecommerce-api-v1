const { body } = require('express-validator');
const express = require('express');
const { 
    getBrands,
    getBrand,
    updataBrand,
    createBrand,
    deleteBrand,
    uploadBrandImage,
    resizeImage,
} = require('../services/brandService');
const { getBrandValidator 
        ,createBrandValidator
        ,updateBrandValidator
        ,deleteBrandValidator
}= require('../utils/validators/brandValidator');

const router = express.Router();
router.route('/')
.get(getBrands)
.post(uploadBrandImage,resizeImage,createBrandValidator,createBrand);
router.route('/:id')
.get(getBrandValidator,getBrand)
.put(updateBrandValidator,updataBrand)
.delete(deleteBrandValidator,deleteBrand); 
module.exports = router;
