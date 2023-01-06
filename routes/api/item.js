const { Router } = require('express');
const router = Router();
const item = require('../../controllers/item');
const auth = require('../../controllers/auth');

router.route('/')
    .get(item.Get)
    .post(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['ADMIN']), item.Create)
    .put(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['ADMIN']), item.Update)

router.route('/:id')
    .get(item.GetById)
    .put(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['ADMIN']),  item.Update)
    .delete(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['ADMIN']), item.Delete);

router.route('/items').
    get(item.GetByIds);

router.route('/seller/:id')
    .get(auth.isJWT, item.GetBySellerId);



module.exports = router;