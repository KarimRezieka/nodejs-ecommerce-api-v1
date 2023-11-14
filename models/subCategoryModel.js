const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        uniqure:[true,"SubCategory Must be unique"],
        minlength:[2,"to short SubCategroy name"],
        maxlength:[32,"To Long SubCategory name"],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        requird:[true,"SubCategory Must be belong to parent category "]
    }

}
,{timeseries:true}
)

module.exports = mongoose.model('SubCategory',subCategorySchema)