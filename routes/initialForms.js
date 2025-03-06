const express = require('express');
const initialFormRouter = express.Router();
const {
    submitInitialUserForm,
    submitInitialPetForm
} = require('../controllers/initialForms');

initialFormRouter.route('/submitInitialUserForm').post(submitInitialUserForm);
initialFormRouter.route('/submitInitialPetForm').post(submitInitialPetForm);

module.exports = initialFormRouter;