const petProfileDetailsRouter = require('express').Router();
const {
    getPetProfileDetails,
    updatePetDetails,
    updateMedicalDetails
} = require('../../controllers/dashboard/petProfileDetails');

petProfileDetailsRouter.route('/getPetProfileDetails/:id').get(getPetProfileDetails);
petProfileDetailsRouter.route('/updatePetDetails').put(updatePetDetails);
petProfileDetailsRouter.route('/updateMedicalDetailsForm').put(updateMedicalDetails);

module.exports = petProfileDetailsRouter;