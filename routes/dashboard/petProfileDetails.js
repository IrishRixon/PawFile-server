const petProfileDetailsRouter = require('express').Router();
const {
    getPetProfileDetails,
    updatePetDetails,
    updateMedicalDetails,
    updateOwnerDetails,
    updateMessageDetails,
    updateNameDetails
} = require('../../controllers/dashboard/petProfileDetails');

petProfileDetailsRouter.route('/getPetProfileDetails/:id').get(getPetProfileDetails);
petProfileDetailsRouter.route('/updatePetDetails').put(updatePetDetails);
petProfileDetailsRouter.route('/updateMedicalDetailsForm').put(updateMedicalDetails);
petProfileDetailsRouter.route('/updateOwnerDetails').put(updateOwnerDetails);
petProfileDetailsRouter.route('/updateMessageDetails').put(updateMessageDetails);
petProfileDetailsRouter.route('/updateNameDetails').put(updateNameDetails);


module.exports = petProfileDetailsRouter;