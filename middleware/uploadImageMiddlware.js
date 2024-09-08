const multer = require('multer');
const ApiError = require("../utils/apiError");


// 1-DiskStoratge engine
// const multerStorage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,"uploads/categories")
//     },
//     filename:function(req,file,cb){
//         //category
//         const ext =file.mimetype.split('/')[1];
//         const filename = `category-${uuidv4()}-${Date.now()}.${ext}`
//         cb(null,filename)
//     }
// })

exports.uploadSingleImage=(filedname)=>{
    const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only Images allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
return upload.single(filedname)
}

exports.uploadMultiImages=(fildname1,fildname2)=>{
  const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
if (file.mimetype.startsWith("image")) {
  cb(null, true);
} else {
  cb(new ApiError("Only Images allowed", 400), false);
}
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
return upload.fields([{name:fildname1,maxCount:1},{name:fildname2,maxCount:5}])
}

