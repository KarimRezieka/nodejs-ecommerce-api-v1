// middlware finds the validation errors in theis request and wraps them in and object with handy funchion
const {validationResult}=require('express-validator')
const validatorMiddleware=(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
};
module.exports = validatorMiddleware;