const express = require('express');
const authenticationRouter = express.Router();
const {
    signUp,
    signIn,
    emailVerification
} = require('../controllers/authentication');

authenticationRouter.route('/signup').post(signUp);
authenticationRouter.route('/signin').post(signIn);
authenticationRouter.route('/emailverif').post(emailVerification);
// authenticationRouter.route('google-signIn').post()

module.exports = authenticationRouter;