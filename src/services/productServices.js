/*
 * Title: Product Services 
 * Description: handle all Product Services
 * Author: Md Abdullah
 * Date: 26/20/23
 */


//Dependencies:
const { deleteImage } = require('../../helper/deleteImage');
const slugify = require('../../helper/slugify');
const Product = require('../models/productModel');
const createError = require('http-errors');

const createProduct = async (productData) => {
    const { name, slug, description, price, quantity, sold, shipping, category, image } = productData;

    const productExist = await Product.exists({ name: productData.name });
    if (productExist) {
         throw createError(409, "Product with this name already exist.");
    }

    return await Product.create({name, slug, description, price, quantity, sold, shipping, category, image});
}


const getProducts = async (page, limit) => {
    const products = await Product.find({})
        .populate("category")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });
         
    const count = await Product.find({}).countDocuments();

    return {products, count}
}


const deleteProduct = async (slug) => {
    const product = await Product.findOneAndDelete({ slug });
    if (!product) {
        throw createError(404, "Product not found with this slug.")
    }     
    if (product.image) {
        await deleteImage(product.image);
    }
}


const updateProduct = async (slug, image, updateOptions, req) => {
    const product = await Product.findOne({ slug });
    let updates = {}; 
        
    for (let key in req.body) {
        if (['name', 'description', 'price', 'sold', "quantity", "shipping"].includes(key)) {
            updates[key] = req.body[key];
        }
    }

    if (updates["name"]) {
        updates.slug = slugify(updates.name);
    }
    if (image) {
        if (image.size > 1024 * 1024 * 2) {
            throw createError(400, 'File is too large')
        }

        updates.image = image;
        product.image !== 'default.jpeg' && await deleteImage(product.image);
    }

    const updatedProduct = await Product.findOneAndUpdate({slug}, updates, updateOptions);

    if (!updatedProduct) {
        throw createError(404, 'Product with this slug does not exist');
    }
    return updateProduct;
}




module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct
}

