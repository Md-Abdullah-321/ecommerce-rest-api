const { Schema, model } = require('mongoose');
const Category = require('./categoryModel');
const { defaultImagePath } = require('../secret');


//name, slug, description, price, quantity, sold, shipping, image
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'The length of Product name must be more that 2 character.'],
        maxlength: [150, 'The length of Product name can be max 150 characters.'],
    },
     slug: {
        type: String,
        required: [true, 'Product slug is required'],
        lowercase: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
        minlength: [10, 'The length of Product description must be more that 10 character.'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        validate: {
            validator: (v) => v > 0,
            message: (props) => {
                `${props.value} is not a valid price. Price must be more than 0`
            }
        }
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        trim: true,
        validate: {
            validator: (v) => v > 0,
            message: (props) => {
                `${props.value} is not a valid quantity. Quantity must be more than 0`
            }
        }
    },
    sold: {
        type: Number,
        required: [true, 'Sold quantity is required'],
        trim: true,
        default: 0,
        validate: {
            validator: (v) => v >= 0,
            message: (props) => {
                `${props.value} is not a valid sold quantity. Sold quantity must be more than 0`
            }
        }
    },
    shipping: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: Category,
        required: true
    }

}, { timestamps: true });

const Product = model('Product', productSchema);
module.exports = Product;