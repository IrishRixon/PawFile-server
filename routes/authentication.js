const express = require('express');
const authenticationRouter = express.Router();
const {
    signUp,
    signIn
} = require('../controllers/authentication');

authenticationRouter.route('/signup').post(signUp);
authenticationRouter.route('/signin').post(signIn);

module.exports = authenticationRouter;