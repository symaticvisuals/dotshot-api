const { Router } = require('express');
const router = Router();
const coupon = require('../../controllers/coupon');
const auth = require('../../controllers/auth');

router.route('/')
    .get(auth.isJWT, coupon.Get)
    .post(coupon.Create)
    .put(auth.isJWT, coupon.Update);

router.route('/:id')
    .put(auth.isJWT, coupon.Update)
    .delete(auth.isJWT, coupon.Delete);

router.route('/code')
    .get(auth.isJWT, auth.getUserFromAuth0, coupon.GetByCode)



module.exports = router;