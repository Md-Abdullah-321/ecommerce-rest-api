/*
 * Title: Validate 
 * Description: Run Validation.
 * Author: Md Abdullah
 * Date: 09/12/23
 */


//Dependencies:
const { validationResult } = require('express-validator');
const { errorResponse } = require('../controllers/responseController');


const runValidation = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(res, {
                statusCode: 422,
                message: errors.array()[0].msg
            })
        }

        return next();
    } catch (error) {
        return next(error);
    }
}

module.exports = runValidation;
