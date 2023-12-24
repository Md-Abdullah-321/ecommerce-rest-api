/*
 * Title: Category Controller 
 * Description: handle all Category Controller
 * Author: Md Abdullah
 * Date: 24/20/23
 */


//Dependencies:
const slugify = require('../../helper/slugify');
const Category = require('../models/categoryModel');
const { createCategory } = require('../services/categoryServices');
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


module.exports = {
    handleCreateCategory,
}