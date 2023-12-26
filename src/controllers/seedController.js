const data = require('../data');
const Product = require('../models/productModel');
const User = require('../models/userModel');

const seedUser = async (req, res, next) => {
    try {
        //delete all existing users:
        await User.deleteMany({});

        //inserting new users:
        const users = await User.insertMany(data.users);

        //successfull response:
        return res.status(201).json(users);
    } catch (error) {
        next(error);
    }
}

const seedProducts = async (req, res, next) => {
    try {
        //delete all existing products:
        await Product.deleteMany({});

        //inserting new products:
        const products = await Product.insertMany(data.products);

        //successfull response:
        return res.status(201).json(products);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    seedUser,
    seedProducts
}