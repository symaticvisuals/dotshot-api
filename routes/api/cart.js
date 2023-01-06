const { Router } = require('express');
const router = Router();
const cart = require('../../controllers/cart');
const auth = require('../../controllers/auth');

router.route('/')
    .get(auth.isJWT, cart.Get)
    .post(auth.isJWT, cart.Create)


router.route('/:id')
    .get(auth.isJWT, cart.GetById)
    .put(auth.isJWT, cart.Update)
    .delete(auth.isJWT, cart.Delete);





module.exports = router;