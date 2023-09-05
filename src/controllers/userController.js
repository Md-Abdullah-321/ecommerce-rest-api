/*
 * Title: User Controller
 * Description: Control all user routes controller.
 * Author: MD Abdullah
 * Date: 05/09/2023
 */



//Dependencies:
const createError = require('http-errors');
const User = require('../models/userModel');
const { successResponse } = require('./responseController');
const { default: mongoose } = require('mongoose');
const { findWithId } = require('../services/findItem');
const { deleteImage } = require('../../helper/deleteImage');
const { createJSONWebToken } = require('../../helper/jsonwebtoken');
const { jwtActivationKey, clientURL } = require('../secret');
const emailWithNodeMailer = require('../../helper/email');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const { decode } = require('punycode');


//get all users:
const getUsers = async(req, res, next) => {
    try {
        const search = req.query.search || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5; 

        const searchRegExp = new RegExp('.*' + search + '.*', 'i');
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ]
        }  
        
        const options = {password: 0}

        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit);
        
        const count = await User.find(filter).countDocuments();

        if (!users) throw createError(404, 'User not found');

        return successResponse(res, {
            statusCode: 200,
            message: 'users returned successfully',
            payload: {
                 users,
            pagination: {
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit)? page + 1 : null,
            }
            }
        })
    } catch (error) {
        next(error)
    }
}

//get user profile:
const getUserById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const options = { password: 0 };
        
        const user = await findWithId(User,id, options);
        return successResponse(res, {
            statusCode: 200,
            message: 'user returned successfully',
            payload: {user},
        })
    } catch (error) {
        
        next(error)
    }
}

//delte user profile:
const deleteUserById = async(req, res, next) => {
    try {
        const id = req.params.id;
        const options = { password: 0 };
        
        const user = await findWithId(id, options);

        const userImagePath = user.image;
        deleteImage(userImagePath);
       
        await User.findByIdAndDelete({ _id: id, isAdmin: false });

        return successResponse(res, {
            statusCode: 200,
            message: 'user wes deleted successfully',
        })
    } catch (error) {
        
        next(error)
    }
}

const processRegister = async(req, res, next) => {
     try {
        const { name, email, password, phone, address } = req.body;

         const userExist = await User.exists({ email: email });

         if (userExist) {
             throw createError(409, "User with this email already exist, please login")
         }

         //create json web token:
         const token = createJSONWebToken({ name, email, password, phone, address }, jwtActivationKey, '10m');

         //prepare email:
         const emailData = {
             email,
             subject: 'Account Activation Email',
             html: `
             <h2>Hello ${name} </h2>
             <p>Please click here to <a href="${clientURL}/api/users/verify/${token} target="_blank">activate your account</a> </p>
             `
         } 

         //send email with nodemailer:
         try {
             await emailWithNodeMailer(emailData);
         } catch (emailError) {
             next(createError(500, 'Failed to send verification email'));
             return;
         }

        return successResponse(res, {
            statusCode: 200,
            message: `Please, go to your ${email}  for completing your registration process`,
            payload: {token}
        })
    } catch (error) {
        
        next(error)
    }
}

const activateUserAccount = async(req, res, next) => {
     try {
        const token = req.body.token;
        
         if (!token) {
             throw createError(404, 'token not found');
        }

         try {
            const decoded = jwt.verify(token, jwtActivationKey);
         
            if(!decode) throw createError(404, 'user was not able to verified')

            const userExist = await User.exists({ email: decode.email });

            if (userExist) {
             throw createError(409, "User with this email already exist, please login")
         }
             
            await User.create(decoded)
            return successResponse(res, {
                statusCode: 201,
                message: `user was registered succuessfully`,
        })
         } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw createError(401, 'Token has expired');
             } else if (error.name === 'JsonWebTokenError') {
                 throw createError(401, 'Invalid token');
             } else {
                 throw error;
            }
         }
    } catch (error) {
        
        next(error)
    }
}

module.exports = {
    getUsers,
    getUserById,
    deleteUserById,
    processRegister,
    activateUserAccount
}