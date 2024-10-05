const { default: mongoose} = require("mongoose");
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'name required']
    },
    slug:{
        type:String,
        lowercase:true,
    },
    email:{
        type:String,
        required:[true,'email required'],
        unique:true,
        lowercase:true
    },
    phone:String,
    profileImg:String,
    password:{
        type:String,
        required:[true,'password required'],
        minlength:[6,'Too short password']
    },
    passwordChangedAt:Date,
    passwordResetCode:String,
    passwordResetExpires:Date,
    passwordResteVerfied:Boolean,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    active:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

UserSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,12)
    next()
})
const User = mongoose.model('User',UserSchema);
module.exports= User;