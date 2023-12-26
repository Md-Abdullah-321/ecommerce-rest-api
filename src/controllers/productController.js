/*
 * Title: Product Controller
 * Description: Control all product routes controller.
 * Author: MD Abdullah
 * Date: 26/12/2023
 */



//Dependencies:
const createError = require('http-errors');
const { successResponse } = require('./responseController');
const { findWithId } = require('../services/findItem');
const { createJSONWebToken } = require('../../helper/jsonwebtoken');
const checkUserExist = require('../../helper/checkUserExist');
const sendEmail = require('../../helper/sendEmail');
const Product = require('../models/productModel');
const slugify = require('../../helper/slugify');
const { createProduct } = require('../services/productServices');


//POST: create product
const handleCreateProduct = async(req, res, next) => {
     try {
        const { name, description, price, quantity, sold, shipping, category } = req.body;

        console.log(name);
        const image = req.file?.path;
        if (!image) {
            throw createError(400, 'image file is required');
        }
         
        if (image.size > 1024 * 1024 * 2) {
            throw createError(400, 'File is too large')
        }
         
        
         const productData = {
            name, slug: slugify(name) ,description, price, quantity, sold, shipping, category, image
        }

         const product = await createProduct(productData);
        return successResponse(res, {
            statusCode: 201,
            message: `product created successfully.`,
            payload: {product}
        })
    } catch (error) {
        
        next(error)
    }
}




module.exports = {
    handleCreateProduct,
}