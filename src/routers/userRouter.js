/*
 * Title: Routes 
 * Description: Route to handle all useer requestts.
 * Author: Md Abdullah
 * Date: 09/12/23
 */


//Dependencies:
const express = require('express');
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount, updateUserById } = require('../controllers/userController');
const upload = require('../middlewares/uploadFile.');
const { validateUserRegistration } = require('../validators/auth');
const runValidation = require('../validators');
const userRouter = express.Router();





//GET: api/users - get all users:
userRouter.get('/', getUsers);

//GET: api/users/profile - get user's profile:
userRouter.get('/:id', getUserById);

//Delete: Delete user by Id:
userRouter.delete('/:id', deleteUserById);

//POST: process the registration:
userRouter.post('/process-register',
    upload.single("image"),
    validateUserRegistration,
    runValidation,
    processRegister);

//POST: Verify user with token:
userRouter.post('/verify', activateUserAccount);

//PUT: Update user ->
userRouter.put('/:id', upload.single("image"),updateUserById)

module.exports = userRouter;