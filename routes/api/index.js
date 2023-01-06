const { Router } = require('express');
const router = Router();

router.use('/user', require('./user'));
router.use('/coupon', require('./coupon'));
router.use('/category', require('./category'));
router.use('/address', require('./address'));
router.use('/item', require('./item'));
router.use('/cart', require('./cart'));
router.use('/cartItem', require('./cartItem'));
router.use('/order', require('./order'));


module.exports = router;
