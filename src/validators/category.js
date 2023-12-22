/*
 * Title:  Validation
 * Description: Validate Category Model.
 * Author: Md Abdullah
 * Date: 22/12/23
 */

//Dependencies: 
const { body, check } = require("express-validator");


//validate Category:
const validateCategory = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 3})
        .withMessage("Category name should be at least 3 characters long"),
]


module.exports = {validateCategory}
