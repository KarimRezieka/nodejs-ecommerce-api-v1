const express =require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config({path:'.env'});
const dbconnection=require('./config/database')
const categoryRoute = require('./routes/categoryRoute')
const supCategoryRoute = require('./routes/subCategoryRoute')
const brandRoute = require('./routes/brandRoute')
const ApiError=require('./utils/apiError')
const globalError =require('./middleware/ErrorMiddlware')

//Connect with db
dbconnection();

//middlewares
const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`node:${process.env.NODE_ENV}`)
}
//Moutn routes 
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/v1/categories',categoryRoute)

app.use('/api/v1/subcategories',supCategoryRoute)

app.use('/api/v1/brands',brandRoute)

app.all("*",(req,res,next)=>{
    next(new ApiError(`cant find this route:${req.originalUrl}`,400))
})


 
//global error handling middlware in express
app.use(globalError);
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`app running ${PORT}`)
})

// Events => listner => callback(err) handle errors came outside express
process.on("unhandledRejection",(err)=>{
    console.log(`unhandledRejection ${err.name} || ${err.message}`);
    server.close(()=>{
        console.log("Shutting down .....")
        process.exit(1)
    })
})
