/*
 * Title: Routes 
 * Description: Route to handle all Product requests.
 * Author: Md Abdullah
 * Date: 26/12/23
 */


//Dependencies:
const express = require('express');
const runValidation = require('../validators');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const { handleCreateProduct } = require('../controllers/productController');
const { validateProduct } = require('../validators/product');
const { uploadProductStorage } = require('../middlewares/uploadFile.');
const productRouter = express.Router();




//POST: create product:
productRouter.post('/',
    uploadProductStorage.single("image"),
    validateProduct,
    runValidation,
    handleCreateProduct);



module.exports = productRouter;