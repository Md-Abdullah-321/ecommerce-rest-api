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
const { jwtAccessKey, jwtRefreshKey } = require('../secret');
const createHttpError = require('http-errors');
const { setRefreshTokenCookie, setAccessTokenCookie } = require('../../helper/cookie');

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
        
        //set access token
        const accessToken = createJSONWebToken({user}, jwtAccessKey, '15m');
        
        setAccessTokenCookie(res, accessToken);

        //set refresh token
        const refreshToken = createJSONWebToken({user}, jwtRefreshKey, '7d');
        
        setRefreshTokenCookie(res, refreshToken);

        
        const userWithoutPassword = await User.findOne({ email }).select('-password');
        //success response
        return successResponse(res, {
            statusCode: 200,
            message: "user logged in successfully",
            payload: {...userWithoutPassword}
        })
    } catch (error) {
        next(error);
    }
}

const handleLogout = async(req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        //success response
        return successResponse(res, {
            statusCode: 200,
            message: "user logged out successfully"
        })
    } catch (error) {
        next(error);
    }
}

const handleRefreshToken = async (req, res, next) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;

        const decodedToken = jwt.verify(oldRefreshToken, jwtRefreshKey);
        if (!decodedToken) {
            throw createHttpError(401, "Invalid refresh token, please login.");
        }
        
        //set access token
        const accessToken = createJSONWebToken(decodedToken.user, jwtAccessKey, '15m');
            
        setAccessTokenCookie(res, accessToken);

         return successResponse(res, {
            statusCode: 200,
            message: "generated access token successfully",
            payload: {},
        })
    } catch (error) {
        next(error);
    }
}
const handleProtectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        const decodedToken = jwt.verify(accessToken, jwtAccessKey);
        if (!decodedToken) {
            throw createHttpError(401, "Invalid access token, please login.");
        }
       
        return successResponse(res, {
            statusCode: 200,
            message: "Protected resources accessed successfully",
            payload: {},
        })
    } catch (error) {
        next(error);
    }
}
module.exports = {handleLogin, handleLogout, handleRefreshToken, handleProtectedRoute}