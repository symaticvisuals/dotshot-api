const { Router } = require('express');
const router = Router();
const order = require('../../controllers/order');
const auth = require('../../controllers/auth');

router.route('/')
    .get(order.Get)
    .post(auth.isJWT, order.Create)
    .put(auth.isJWT, order.Update)

router.route('/:id')
    .get(order.GetById)
    .put(auth.isJWT, order.Update)
    .delete(auth.isJWT, order.Delete);

router.route('/status/:id')
    .put(auth.isJWT, order.updateOrderStatus)

module.exports = router;