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

        console.log(ownerDetails, 'owner');
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

        const newPetDetails = await PetIFormModel.findOneAndUpdate(
            {
                name,
                owner: email,
            },
            newData,
            {
                new: true,
            }
        );
        console.log(newPetDetails);
        res.status(200).json(newPetDetails);
    } catch (error) {
        console.log(error);
        res.status(400).send("An error occured.");
    }
};

const updateMedicalDetails = async (req, res) => {
    try {
        const newData = req.body;
        const { email } = req.user;
        console.log(newData);
        const { name } = newData;
        console.log(name);

        const newMedicalDetails = await MedicalIFormModel.findOneAndUpdate(
            { email, petName: name },
            newData,
            { new: true }
        );

        console.log(newMedicalDetails);
        res.status(200).json(newMedicalDetails);
    } catch (error) {
        console.log(error);
        res.status(400).send("An error occured.");
    }
};

const updateOwnerDetails = async (req, res) => {
    try {
        const newData = req.body;
        const { email } = req.user;

        const newOwnerDetails = await UserIFormModel.findOneAndUpdate(
            { email },
            newData,
            { new: true }
        );

        console.log(newOwnerDetails);
        res.status(200).json(newOwnerDetails);
    } catch (error) {
        console.log(error);
    }
} 

module.exports = {
    getPetProfileDetails,
    updatePetDetails,
    updateMedicalDetails,
    updateOwnerDetails
};
