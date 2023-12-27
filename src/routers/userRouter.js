/*
 * Title: Routes 
 * Description: Route to handle all useer requestts.
 * Author: Md Abdullah
 * Date: 09/12/23
 */


//Dependencies:
const express = require('express');
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount, updateUserById, handleBanUserById, handleUnbanUserById, handleUpdatePassword, handleForgetPassword, handleResetPassword } = require('../controllers/userController');
const {upload} = require('../middlewares/uploadFile.');
const { validateUserRegistration, validateUserPasswordUpdate, validateForgetPassword, validateResetPassword } = require('../validators/auth');
const runValidation = require('../validators');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const userRouter = express.Router();





//GET: api/users - get all users:
userRouter.get('/', isLoggedIn , isAdmin,getUsers);

//GET: api/users/profile - get user's profile:
userRouter.get('/:id([0-9a-fA-F]{24})', isLoggedIn ,getUserById);

//Delete: Delete user by Id:
userRouter.delete('/:id([0-9a-fA-F]{24})', isLoggedIn,deleteUserById);

//POST: process the registration:
userRouter.post('/process-register',
    upload.single("image"),
    isLoggedOut,
    validateUserRegistration,
    runValidation,
    processRegister);

//POST: Verify user with token:
userRouter.post('/activate', isLoggedOut, activateUserAccount);

userRouter.put('/update-password/:id([0-9a-fA-F]{24})', isLoggedIn, validateUserPasswordUpdate, runValidation, handleUpdatePassword);

userRouter.put('/reset-password', validateResetPassword, runValidation, handleResetPassword);

//PUT: Update user ->
userRouter.put('/:id([0-9a-fA-F]{24})', isLoggedIn, upload.single("image"), updateUserById);

userRouter.put('/ban-user/:id([0-9a-fA-F]{24})', isLoggedIn, isAdmin, handleBanUserById);

userRouter.post('/forget-password', validateForgetPassword, runValidation, handleForgetPassword);

userRouter.put('/unban-user/:id([0-9a-fA-F]{24})', isLoggedIn, isAdmin, handleUnbanUserById);




module.exports = userRouter;