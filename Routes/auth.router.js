let express = require('express'),
    router = express.Router();
let authenticationController = require('../Controllers/auth.controller');
const verifyToken = require("../Middleware/auth.middleware");

// SignUp
router.route('/signup')
    .post(authenticationController.signup);

// //SignIn
router.route('/signin')
    .post(authenticationController.signin);

router.route('/google')
    .post(authenticationController.signInWithGoogle);

router.route('/change-password')
    .post(verifyToken, authenticationController.changePassword);

module.exports = router;