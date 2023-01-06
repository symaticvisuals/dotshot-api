const { Router } = require('express');
const router = Router();
const user = require('../../controllers/user');
const auth = require('../../controllers/auth');

router.route('/')
    .get(auth.isJWT, user.Get)
    .put(auth.isJWT, user.Update)

router.route('/:id')
    .get(auth.isJWT, user.GetById)
    .put(auth.isJWT, user.Update)
    .delete(auth.isJWT, user.Delete);


router.route('/login')
    .post(auth.isJWT, auth.getUserFromAuth0, user.Login);

router.route('/createAccount')
    .post(auth.isJWT, auth.getUserFromAuth0, user.Create);



module.exports = router;