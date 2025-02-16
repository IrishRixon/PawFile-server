const express = require('express');
const authenticationRouter = express.Router();
const {
    signUp,
    signIn,
    emailVerification,
    verifyCode
} = require('../controllers/authentication');

authenticationRouter.route('/signup').post(signUp);
authenticationRouter.route('/signin').post(signIn);
authenticationRouter.route('/emailverif').post(emailVerification);
authenticationRouter.route('/verifcode').post(verifyCode);
// authenticationRouter.route('google-signIn').post()

module.exports = authenticationRouter;