const petProfileDetailsRouter = require('express').Router();
const {
    getPetProfileDetails,
    updatePetDetails,
    updateMedicalDetails,
    updateOwnerDetails
} = require('../../controllers/dashboard/petProfileDetails');

petProfileDetailsRouter.route('/getPetProfileDetails/:id').get(getPetProfileDetails);
petProfileDetailsRouter.route('/updatePetDetails').put(updatePetDetails);
petProfileDetailsRouter.route('/updateMedicalDetailsForm').put(updateMedicalDetails);
petProfileDetailsRouter.route('/updateOwnerDetails').put(updateOwnerDetails);

module.exports = petProfileDetailsRouter;