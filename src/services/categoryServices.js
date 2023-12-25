/*
 * Title: Category Services 
 * Description: handle all Category Services
 * Author: Md Abdullah
 * Date: 24/20/23
 */


//Dependencies:
const slugify = require('../../helper/slugify');
const Category = require('../models/categoryModel');

const createCategory = async (name) => {
    const newCategory = await Category.create({
        name,
        slug: slugify(name)
    })

    return newCategory;
}


const getCategories = async () => {
    return await Category.find({}).select("name slug").lean();
}

module.exports = {
    createCategory,
    getCategories,
}

