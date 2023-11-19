/*
 * Title:  Validation
 * Description: Validate Registration & Login using express validator.
 * Author: Md Abdullah
 * Date: 09/12/23
 */

//Dependencies: 
const { body, check } = require("express-validator");


//validate Registration:
const validateUserRegistration = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3, max: 31 })
        .withMessage("Name should be at least 3-31 characters long"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid emmail address"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6})
        .withMessage("Password should be at least 6 character long"),
    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required"),
     
    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone is required"),
    body("phone")
        .optional()
        .isString(),
    body('image')
        .custom((value, { req }) => {
            if (!req.file || !req.file.buffer) {
                throw new Error('User image is required');
            }
            return true;
        })
        .withMessage('User image is require'),
]


//validate Registration:
const validateUserLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required, Enter your email address")
        .isEmail()
        .withMessage("Invalid emmail address"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required, Enter your password")
        .isLength({ min: 6})
        .withMessage("Password should be at least 6 character long"),
]

module.exports = {validateUserRegistration, validateUserLogin}
