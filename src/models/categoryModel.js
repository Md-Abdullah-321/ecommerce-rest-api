const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        minlength: [3, 'The length of Category name must be more that 2 character.'],
        maxlength: [31, 'The length of Category name can be max 31 characters.'],
    },
     slug: {
        type: String,
        required: [true, 'Category slug is required'],
        lowercase: true,
        unique: true,
    },

}, { timestamps: true });

const Category = model('Category', categorySchema);
module.exports = Category;