const { body } = require('express-validator');
const express = require('express');
const { 
 getUser,
 getUsers,
 createUser,
 updateUser,
 deleteUser,
 uploadUserImage,
 resizeImage,
} = require('../services/userService');
const { getUserValidator,updateUserValidator,deleteUserValidator,createUserValidator
}= require('../utils/validators/userValidator');

const router = express.Router();
router.route('/')
.get(getUsers)
.post(createUserValidator,uploadUserImage,resizeImage,createUser);
router.route('/:id')
.get(getUserValidator,getUser)
.put(updateUserValidator,updateUser)
.delete(deleteUserValidator,deleteUser); 
module.exports = router;
