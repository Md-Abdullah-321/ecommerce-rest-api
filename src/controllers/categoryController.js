/*
 * Title: Category Controller 
 * Description: handle all Category Controller
 * Author: Md Abdullah
 * Date: 24/20/23
 */


//Dependencies:
const slugify = require('../../helper/slugify');
const Category = require('../models/categoryModel');
const { createCategory, getCategories, getCategory } = require('../services/categoryServices');
const { successResponse } = require('./responseController');

const handleCreateCategory = async (req, res, next) => {
    try {
        const {name} = req.body;
        await createCategory(name);
        return successResponse(res, {
            statusCode: 200,
            message: 'Category was created successfully.',
        })
    } catch (error) {
        next(error)
    }
}

const handleGetCategories = async (req, res, next) => {
    try {
        const categories = await getCategories();
        
        return successResponse(res, {
            statusCode: 200,
            message: 'Categories fetched successfully.',
            payload: categories
        })
    } catch (error) {
        next(error)
    }
}


const handleGetCategory = async (req, res, next) => {
    try {
        const { slug } = req.params;
        
        const category = await getCategory(slug);
        return successResponse(res, {
            statusCode: 200,
            message: 'Category fetched successfully.',
            payload: category
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    handleCreateCategory,
    handleGetCategories,
    handleGetCategory
}