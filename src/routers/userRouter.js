/*
 * Title: Routes 
 * Description: Route to handle all useer requestts.
 * Author: Md Abdullah
 * Date: 09/12/23
 */


//Dependencies:
const express = require('express');
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount, updateUserById, handleBanUserById, handleUnbanUserById } = require('../controllers/userController');
const upload = require('../middlewares/uploadFile.');
const { validateUserRegistration } = require('../validators/auth');
const runValidation = require('../validators');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const userRouter = express.Router();





//GET: api/users - get all users:
userRouter.get('/', isLoggedIn , isAdmin,getUsers);

//GET: api/users/profile - get user's profile:
userRouter.get('/:id', isLoggedIn ,getUserById);

//Delete: Delete user by Id:
userRouter.delete('/:id', isLoggedIn,deleteUserById);

//POST: process the registration:
userRouter.post('/process-register',
    upload.single("image"),
    isLoggedOut,
    validateUserRegistration,
    runValidation,
    processRegister);

//POST: Verify user with token:
userRouter.post('/activate' ,isLoggedOut, activateUserAccount);

//PUT: Update user ->
userRouter.put('/:id', upload.single("image"), isLoggedIn, updateUserById);

userRouter.put('/ban-user/:id', isLoggedIn, isAdmin, handleBanUserById);

userRouter.put('/unban-user/:id',isLoggedIn, isAdmin, handleUnbanUserById);
module.exports = userRouter;