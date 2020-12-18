const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const {requireAuth} = require('../middleware/authenticationMiddleware')

router.get('/signup', authenticationController.signup_get);

router.post('/signup', authenticationController.signup_post);

router.get('/login', authenticationController.login_get);

router.post('/login', authenticationController.login_post);

router.get('/logout', authenticationController.logout_get);

router.get('/isUserAuth', requireAuth, authenticationController.isUserAuth);

module.exports = router;