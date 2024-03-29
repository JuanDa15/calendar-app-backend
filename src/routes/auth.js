// Host + /api/v1/auth

const {Router} = require('express');
const {check} = require('express-validator');
const {renew, login, register} = require('../controllers/auth');
const {checkFields} = require('../middlewares/check-fields');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();

router.post(
    '/',
    [
      check('email', 'Email is required').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
      checkFields,
    ],
    login,
);

router.post(
    '/register',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
      check('password', 'Password must be at least 6 characters').isLength({
        min: 6,
      }),
      checkFields,
    ],
    register,
);

router.post('/renew', [validateJWT], renew);

module.exports = router;
