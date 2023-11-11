/*
 * Title: Auth Middleware 
 * Description: Handle All Auth Related Middleware
 * Author: Md Abdullah
 * Date: 11/08/23
 */



//Dependencies:
const createError = require('http-errors');
const jwt = require("jsonwebtoken");
const { jwtAccessKey } = require('../secret');


const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            throw createError(401, "Access token not found, please login")
        }
        
        const decoded = jwt.verify(token, jwtAccessKey);
        
        if (!decoded) {
            throw createError(401, "Invalid access token, please login again");
        }

        req.body.userId = decoded._id;
        next();
    } catch (error) {
        return next(error);
    }
}



const isLoggedOut = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (token) {
            throw createError(400, "User is already logged in")
        }
        next();
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    isLoggedIn,
    isLoggedOut
}