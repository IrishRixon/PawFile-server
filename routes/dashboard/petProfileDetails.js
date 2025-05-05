const petProfileDetailsRouter = require('express').Router();
const {
    getPetProfileDetails,
} = require('../../controllers/dashboard/petProfileDetails');

petProfileDetailsRouter.route('/getPetProfileDetails/:id').get(getPetProfileDetails);

module.exports = petProfileDetailsRouter;