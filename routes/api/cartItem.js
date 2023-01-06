const { Router } = require('express');
const router = Router();
const cartItem = require('../../controllers/cartItem');
const auth = require('../../controllers/auth');

router.route('/')
    .get(auth.isJWT, cartItem.Get)
    .post(auth.isJWT, cartItem.Create)

router.route('/:id')
    .put(auth.isJWT, cartItem.Update)
    .delete(auth.isJWT, cartItem.Delete);

router.route('/bulk')
    .post(auth.isJWT, cartItem.BulkCreate);

router.route('/seller/:id')
    .get(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['ADMIN']), cartItem.getBySellerId)

router.route('/status/:id')
    .put(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['ADMIN']), cartItem.updateCartItemStatus)

module.exports = router;