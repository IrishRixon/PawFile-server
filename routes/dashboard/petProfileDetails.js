const petProfileDetailsRouter = require('express').Router();
const {
    getPetProfileDetails,
    updatePetDetails,
    updateMedicalDetails,
    updateOwnerDetails,
    updateMessageDetails,
    updateNameDetails,
    carouselImage,
    deleteCarouselImage
} = require('../../controllers/dashboard/petProfileDetails');

const { singleImageUpload } = require('../../controllers/singleImageUpload');
const upload = require('../../utils/multer');

petProfileDetailsRouter.route('/getPetProfileDetails/:id').get(getPetProfileDetails);
petProfileDetailsRouter.route('/updatePetDetails').put(updatePetDetails);
petProfileDetailsRouter.route('/updateMedicalDetailsForm').put(updateMedicalDetails);
petProfileDetailsRouter.route('/updateOwnerDetails').put(updateOwnerDetails);
petProfileDetailsRouter.route('/updateMessageDetails').put(updateMessageDetails);
petProfileDetailsRouter.route('/updateNameDetails').put(updateNameDetails);
petProfileDetailsRouter.route('/uploadPetImage').put(upload.single('image'), singleImageUpload);
petProfileDetailsRouter.route('/carouselImage').post(upload.single('image'), carouselImage);
petProfileDetailsRouter.route('/deleteCarouselImage/:_id/:index').delete(deleteCarouselImage);


module.exports = petProfileDetailsRouter;