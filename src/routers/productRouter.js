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
const { handleCreateProduct, handleGetProducts, handleGetProductBySlug, handleDeleteProductBySlug, handleUpdateProduct } = require('../controllers/productController');
const { validateProduct } = require('../validators/product');
const { uploadProductStorage } = require('../middlewares/uploadFile.');
const productRouter = express.Router();




//POST: create product:
productRouter.post('/',
    uploadProductStorage.single("image"),
    validateProduct,
    runValidation,
    handleCreateProduct);

//GET: get all products:
productRouter.get('/',  handleGetProducts);

//GET: get all products:
productRouter.get('/:slug', handleGetProductBySlug);

//DELETE: delete a product:
productRouter.delete('/:slug', isLoggedIn, isAdmin, handleDeleteProductBySlug);

//PUT: update a product:
productRouter.put('/:slug', uploadProductStorage.single("image"), isLoggedIn, isAdmin, handleUpdateProduct);



module.exports = productRouter;