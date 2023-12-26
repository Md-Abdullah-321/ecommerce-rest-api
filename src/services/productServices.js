/*
 * Title: Product Services 
 * Description: handle all Product Services
 * Author: Md Abdullah
 * Date: 26/20/23
 */


//Dependencies:
const slugify = require('../../helper/slugify');
const Product = require('../models/productModel');

const createProduct = async (productData) => {
    const { name, slug, description, price, quantity, sold, shipping, category, image } = productData;

    const productExist = await Product.exists({ name: productData.name });
    if (productExist) {
         throw createError(409, "Product with this name already exist.");
    }

    return await Product.create({name, slug, description, price, quantity, sold, shipping, category, image});
}



module.exports = {
    createProduct
}

