/*
 * Title: Routes 
 * Description: Route to handle all Category requests.
 * Author: Md Abdullah
 * Date: 24/12/23
 */


//Dependencies:
const express = require('express');

const upload = require('../middlewares/uploadFile.');
const runValidation = require('../validators');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middlewares/auth');
const { handleCreateCategory } = require('../controllers/categoryController');
const { validateCategory } = require('../validators/category');
const categoryRouter = express.Router();






//POST: :
categoryRouter.post('/',validateCategory,runValidation,isLoggedIn, isAdmin ,handleCreateCategory);


module.exports = categoryRouter;