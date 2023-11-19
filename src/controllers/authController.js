/*
 * Title: Auth Controller. 
 * Description: Handle all auth related work.
 * Author: Md Abdullah
 * Date: 09/17/23
 */


//Dependencies:
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { successResponse, errorResponse } = require('./responseController');
const { createJSONWebToken } = require('../../helper/jsonwebtoken');
const { jwtAccessKey } = require('../secret');

const handleLogin = async(req, res, next) => {
    try {
        //email, password req.body
        const { email, password } = req.body;

        //isExist
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User does not exist with this email, please register first."
            })
        }

        //compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

         if (!isPasswordMatch) {
            return errorResponse(res, {
                statusCode: 401,
                message: "Email/password did not match."
            })
         }
        
        //isBanned
        if (user.isBanned) {
            return errorResponse(res, {
                statusCode: 403,
                message: "You are banned, please contact authority."
            })
         }
        //token, coookie
        const accessToken = createJSONWebToken({user}, jwtAccessKey, '15m');

        res.cookie('accessToken', accessToken, {
            maxAge: 15 * 60 * 1000, //15 minutes
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        //success response
        return successResponse(res, {
            statusCode: 200,
            message: "user logged in successfully"
        })
    } catch (error) {
        next(error);
    }
}

const handleLogout = async(req, res, next) => {
    try {
        res.clearCookie('accessToken');
        //success response
        return successResponse(res, {
            statusCode: 200,
            message: "user logged out successfully"
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {handleLogin, handleLogout}