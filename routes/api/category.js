const { Router } = require('express');
const router = Router();
const category = require('../../controllers/category');
const auth = require('../../controllers/auth');

router.route('/')
    .get(category.Get)
    .post(category.Create)
    .put(auth.isJWT, category.Update)

router.route('/:id')
    .get(auth.isJWT, category.GetById)
    .put(auth.isJWT, category.Update)
    .delete(auth.isJWT, category.Delete);



module.exports = router;