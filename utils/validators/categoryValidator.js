const {param, check}=require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware')
exports.getCategoryValidator=
[param('id').isMongoId().withMessage("Inavalid Category ID"),validatorMiddleware];

exports.createCategoryValidator = [
    check('name').notEmpty()
    .withMessage('Category Requird')
    .isLength({min:3})
    .withMessage('Too short category name')
    .isLength({max:32})
    .withMessage('Too long category name'),
    validatorMiddleware,
];
exports.updateCategoryValidator = [
    param('id')
    .isMongoId()
    .withMessage("Inavalid Category ID")
    ,validatorMiddleware
]
exports.deleteCategoryValidator = [
    param('id')
    .isMongoId()
    .withMessage("Inavalid Category ID")
    ,validatorMiddleware
]