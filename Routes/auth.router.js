let express = require('express'),
    router = express.Router();
let authenticationController = require('../Controllers/auth.controller');

console.log(authenticationController)


// SignUp
router.route('/signup')
    .post(authenticationController.signup);

// //SignIn
router.route('/signin')
    .post(authenticationController.signin);

module.exports = router;