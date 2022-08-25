let express = require('express'),
    router = express.Router();
let categoryController = require('../Controllers/category.controller');
const verifyToken = require("../Middleware/auth.middleware");




router.route('/')
    .get(verifyToken, categoryController.showListCategory);

router.route('/add')
    .post(verifyToken,categoryController.addCategory);

router.route('/:id')
    .put(verifyToken,categoryController.updateCategory);

router.route('/delete')
    .delete(verifyToken,categoryController.deleteCategory);

module.exports = router;