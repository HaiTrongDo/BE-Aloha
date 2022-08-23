let express = require('express'),
    router = express.Router();
let myAccountController = require('../Controllers/my-account.controller')

router.route('/change-profile')
    .post(myAccountController.updateProfile);

module.exports = router;