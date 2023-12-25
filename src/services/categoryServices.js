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

const getCategory = async (slug) => {
    return await Category.find({slug}).lean();
}

const updateCategory = async (name, slug) => {
    const filter = {slug: slug};
    const update = { $set: { name: name, slug: slugify(name) } }
    const option = { new: true };

    return await Category.findOneAndUpdate(filter, update, option)
}

const deleteCategory = async (slug) => {
    const result = await Category.findOneAndDelete({ slug });
    return result;
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
}

