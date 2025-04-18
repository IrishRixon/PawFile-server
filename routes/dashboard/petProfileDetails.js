const petProfileDetailsRouter = require('express').Router();
const {
    getPetProfileDetails,
} = require('../../controllers/dashboard/petProfileDetails');

petProfileDetailsRouter.route('/getPetProfileDetails/:name').get(getPetProfileDetails);

module.exports = petProfileDetailsRouter;