let express = require('express'),
    router = express.Router();
let iconController = require('../Controllers/wallet.controller');

router.post('/add',iconController.addWallet);
router.get('/render',iconController.renderWallet);

module.exports = router;