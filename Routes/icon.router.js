let express = require('express'),
    router = express.Router();
let iconController = require('../Controllers/icon.controller');

router.post('/add',iconController.add)

module.exports = router;