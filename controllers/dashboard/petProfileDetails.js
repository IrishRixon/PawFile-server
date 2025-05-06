const PetIFormModel = require("../../models/petInitialForm");
const UserIFormModel = require("../../models/userInitialForm");
const MedicalIFormModel = require("../../models/medicalIForm");

const getPetProfileDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.user;
        const petDetails = await PetIFormModel.findOne({ _id: id });
        const ownerDetails = await UserIFormModel.findOne({ email });
        const medicalDetails = await MedicalIFormModel.findOne({
            petName: petDetails.name,
        });

        res.status(200).json({
            petDetails,
            ownerDetails,
            medicalDetails,
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const updatePetDetails = async (req, res) => {
    try {
        const newData = req.body;
        const { email } = req.user;
        const { name } = newData;
        console.log(newData);
        console.log(name);

        const petDetails = await PetIFormModel.findOneAndUpdate(
            {
                name,
                owner: email,
            },
            newData,
            {
                new: true
            }
        );
        console.log(petDetails);
        res.status(200).json(petDetails);
    } catch (error) {
        console.log(error);
        res.status(400).send('An error occured.');
    }
};

module.exports = {
    getPetProfileDetails,
    updatePetDetails,
};
