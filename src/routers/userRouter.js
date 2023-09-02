const express = require('express');
const { getUsers, getUserById, deleteUserById, processRegister } = require('../controllers/userController');
const userRouter = express.Router();

//GET: api/users - get all users:
userRouter.get('/', getUsers);

//GET: api/users/profile - get user's profile:
userRouter.get('/:id', getUserById);

//Delete: Delete user by Id:
userRouter.delete('/:id', deleteUserById);

//POST: process the registration:
userRouter.post('/process-register', processRegister);



module.exports = userRouter;