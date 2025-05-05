const PetIFormModel = require('../../models/petInitialForm');
const UserIFormModel = require('../../models/userInitialForm');
const MedicalIFormModel = require('../../models/medicalIForm');

const getPetProfileDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.user;
        const petDetails = await PetIFormModel.findOne({ _id: id });
        const ownerDetails = await UserIFormModel.findOne({ email });
        const medicalDetails = await MedicalIFormModel.findOne({ petName: petDetails.name });

        res.status(200).json({ 
            petDetails,
            ownerDetails,
            medicalDetails 
        });
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = {
    getPetProfileDetails,
}