const express = require('express');
const authenticationRouter = express.Router();
const {
    signUp,
    signIn,
    emailVerification,
    verifyCode,
    findAccount,
    changePassword,
    logOut
} = require('../controllers/authentication');

authenticationRouter.route('/signup').post(signUp);
authenticationRouter.route('/signin').post(signIn);
authenticationRouter.route('/emailverif').post(emailVerification);
authenticationRouter.route('/verifcode').post(verifyCode);
authenticationRouter.route('/findaccount').post(findAccount);
authenticationRouter.route('/changePassword').put(changePassword);
authenticationRouter.route('/logOut').post(logOut);
// authenticationRouter.route('google-signIn').post()

module.exports = authenticationRouter;