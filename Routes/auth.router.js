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

router.route('/firebase')
    .post(authenticationController.signInWithFireBase);

router.route('/change-password')
    .put(verifyToken, authenticationController.changePassword);

module.exports = router;