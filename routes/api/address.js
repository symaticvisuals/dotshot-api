const { Router } = require('express');
const router = Router();
const address = require('../../controllers/address');
const auth = require('../../controllers/auth');

router.route('/')
    .get(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['USER']), address.Get)
    .post(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['USER']), address.Create)
    .put(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['USER']), address.Update)

router.route('/:id')
    .get(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['USER']), address.GetById)
    .put(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['USER']), address.Update)
    .delete(auth.isJWT, auth.getUserFromAuth0, auth.checkAllowedRoles(['USER']), address.Delete);



module.exports = router;