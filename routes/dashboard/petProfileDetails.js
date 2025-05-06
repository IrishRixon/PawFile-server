const petProfileDetailsRouter = require('express').Router();
const {
    getPetProfileDetails,
    updatePetDetails
} = require('../../controllers/dashboard/petProfileDetails');

petProfileDetailsRouter.route('/getPetProfileDetails/:id').get(getPetProfileDetails);
petProfileDetailsRouter.route('/updatePetDetails').put(updatePetDetails);

module.exports = petProfileDetailsRouter;