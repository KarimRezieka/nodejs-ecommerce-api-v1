const globalError = (err,req,res,next)=>{
    err.status= err.status || 'error'
    err.statusCode = err.statusCode || 500
    if(process.env.NODE_ENV == "development"){
        sendErrorForDev(res,err);
    }else{
        sendErrorFoProd(res,err)
    }
}
const sendErrorForDev=(res,err)=>{
    return res.status(err.statusCode).json({
        status: err.status,
        error:err,
        message:err.message,
        stack:err.stack,
    });
}
const sendErrorFoProd=(res,err)=>{
    return res.status(err.statusCode).json({
        status: err.status,
        message:err.message,
    });
}
module.exports= globalError;