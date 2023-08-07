var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/product', require('./product'));
router.use('/order', require('./order'));
router.use('/cart', require('./cart'))
// router.use('./card', require('./card'));


module.exports = router;