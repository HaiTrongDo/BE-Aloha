let express = require('express'),
    router = express.Router();
let categoryController = require('../Controllers/category.controller');
const verifyToken = require("../Middleware/auth.middleware");




router.route('/')
    .get(verifyToken, categoryController.showListCategory);

module.exports = router;