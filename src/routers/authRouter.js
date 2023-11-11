/*
 * Title: Routes 
 * Description: Route to handle all auth requestts.
 * Author: Md Abdullah
 * Date: 09/12/23
 */


//Dependencies:
const express = require('express');
const runValidation = require('../validators');
const { handleLogin, handleLogout } = require('../controllers/authController');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth');
const authRouter = express.Router();


authRouter.post("/login", isLoggedOut,handleLogin);
authRouter.post("/logout", isLoggedIn,handleLogout);




module.exports = authRouter;