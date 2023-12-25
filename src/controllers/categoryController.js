/*
 * Title: Category Controller 
 * Description: handle all Category Controller
 * Author: Md Abdullah
 * Date: 24/20/23
 */


//Dependencies:
const createError = require('http-errors');
const slugify = require('../../helper/slugify');
const Category = require('../models/categoryModel');
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../services/categoryServices');
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
        if (!category) {
            throw createHttpError(404, "Category not found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: 'Category fetched successfully.',
            payload: category
        })
    } catch (error) {
        next(error)
    }
}


const handleUpdateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { slug } = req.params;

        const updatedCategory = await updateCategory(name, slug);
        if (!updatedCategory) {
            throw createError(404, "No category found with this slug");
        }

        return successResponse(res, {
            statusCode: 200,
            message: 'Category updated successfully.',
            payload: updatedCategory
        })
    } catch (error) {
        next(error)
    }
}


const handleDeleteCategory = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const result = await deleteCategory(slug);
        if (!result) {
            throw createError(404, "No category found with this slug");
        }

        return successResponse(res, {
            statusCode: 200,
            message: 'Category deleted successfully.',
            payload: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    handleCreateCategory,
    handleGetCategories,
    handleGetCategory,
    handleUpdateCategory,
    handleDeleteCategory
}