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
const { createProduct, getProducts, deleteProduct, updateProduct } = require('../services/productServices');
const { deleteImage } = require('../../helper/deleteImage');


//POST: create product
const handleCreateProduct = async(req, res, next) => {
     try {
        const { name, description, price, quantity, sold, shipping, category } = req.body;

        const image = req.file?.path;
        if (!image) {
            throw createError(400, 'image file is required');
        }
         
        if (image.size > 1024 * 1024 * 2) {
            throw createError(400, 'File is too large')
        }
         
        
         const productData = {
            name, slug: slugify(name) ,description, price, quantity, sold, shipping, category
         }
         if (image) {
             productData.image = image;
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

//GET: get all products
const handleGetProducts = async(req, res, next) => {
     try {
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 4;
         const search = req.query.search || "";

        const searchRegExp = new RegExp('.*' + search + '.*', 'i');
        const filter = {
            $or: [
                { name: { $regex: searchRegExp } },
            ]
        }  

         const {products, count} = await getProducts(page, limit, filter);

        return successResponse(res, {
            statusCode: 201,
            message: `Product fetched successfully.`,
            payload: {
                ...products,
                pagination: {
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1,
                    nextPage: page + 1,
                    totalNumberOfProducts: count
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

//GET: get all products
const handleGetProductBySlug = async(req, res, next) => {
     try {
         const { slug } = req.params;
         
         const product = await Product.findOne({ slug }).populate("category");
         if (!product) {
            throw createError(404, "Product not found with this slug.")
        }
        return successResponse(res, {
            statusCode: 201,
            message: `Product fetched successfully.`,
            payload: product,
        })
    } catch (error) {
        next(error)
    }
}

//DELETE: delete a product
const handleDeleteProductBySlug = async(req, res, next) => {
     try {
        const { slug } = req.params;
        await deleteProduct(slug);
         
        return successResponse(res, {
            statusCode: 201,
            message: `Product deleted successfully.`,
        })
    } catch (error) {
        next(error)
    }
}


//PUT: Update product By slug:
const handleUpdateProduct = async(req, res, next) => {
    try {
        const { slug } = req.params;
        const updateOptions = { new: true, runValidators: true, contex: 'query'};
        const image = req.file?.path;

        const updatedProduct = await updateProduct(slug,image, updateOptions, req);
        return successResponse(res, {
            statusCode: 200,
            message: 'product wes updated successfully',
            payload: updatedProduct
        })
    } catch (error) {
        
        next(error)
    }
}


module.exports = {
    handleCreateProduct,
    handleGetProducts,
    handleGetProductBySlug,
    handleDeleteProductBySlug,
    handleUpdateProduct,
}