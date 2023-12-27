/*
 * Title:  Validation
 * Description: Validate Category Model.
 * Author: Md Abdullah
 * Date: 26/12/23
 */

//Dependencies: 
const { body, check } = require("express-validator");


//validate Category:
const validateProduct = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 3, max: 150})
        .withMessage("Product name should be 3 - 150 characters long"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 10 })
        .withMessage("Description should be at least 10 character long"),
    body("price")
        .trim()
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0 })
        .withMessage("price must be a positive number"),
    body("category")
        .trim().notEmpty().withMessage("category is required"),
    body("quantity")
        .trim()
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({min : 1})
        .withMessage("Quantity must be a positive integer"),
     body('image').optional().isString().withMessage('Product image is optional')

]


module.exports = {validateProduct}
