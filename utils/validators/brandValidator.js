const {param, check}=require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware')

exports.getBrandValidator=
[param('id').isMongoId().withMessage("Inavalid Brand ID"),validatorMiddleware];

exports.createBrandValidator = [
    check('name').notEmpty()
    .withMessage('Brand Requird')
    .isLength({min:3})
    .withMessage('Too short Brand name')
    .isLength({max:32})
    .withMessage('Too long Brand name'),
    validatorMiddleware,
];
exports.updateBrandValidator = [
    param('id')
    .isMongoId()
    .withMessage("Inavalid Brand ID")
    ,validatorMiddleware
]
exports.deleteBrandValidator = [
    param('id')
    .isMongoId()
    .withMessage("Inavalid Brand ID")
    ,validatorMiddleware
]