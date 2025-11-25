const PetIFormModel = require("../../models/petInitialForm");
const UserIFormModel = require("../../models/userInitialForm");
const MedicalIFormModel = require("../../models/medicalIForm");
const cloudinary = require("../../utils/cloudinary");
const { log } = require("console");

const getPetProfileDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.user;
        const petDetails = await PetIFormModel.findOne({ _id: id });
        const ownerDetails = await UserIFormModel.findOne({ email });
        const medicalDetails = await MedicalIFormModel.findOne({
            email,
        });

        console.log(ownerDetails, "owner");
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
            { email },
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
};

const updateMessageDetails = async (req, res) => {
    try {
        const { message } = req.body;
        const { email } = req.user;
        const { name } = req.body;

        const newMessageDetails = await PetIFormModel.findOneAndUpdate(
            { name, owner: email },
            { message },
            { new: true }
        );

        console.log(newMessageDetails);
        res.status(200).json(newMessageDetails);
    } catch (error) {
        res.status(200).json(error);
    }
};

const updateNameDetails = async (req, res) => {
    try {
        const { prevName } = req.body;
        const { newName } = req.body;
        const { email } = req.user;
        console.log(req.body);

        const newData = await PetIFormModel.findOneAndUpdate(
            { name: prevName, owner: email },
            { name: newName.name },
            { new: true }
        );

        console.log(newData);
        res.status(200).json({
            prevName: prevName,
            newName: newName.name,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

const carouselImage = async (req, res) => {
    try {
        const { _id } = req.body;

        const petDetails = await PetIFormModel.findOne({ _id });
        console.log(petDetails);
        if (petDetails.images.length < 5) {
            const fileBuffer = req.file.buffer.toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${fileBuffer}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "Carousel_Images",
                transformation: {
                    width: 200,
                    height: 200,
                    gravity: "auto",
                    crop: "fill",
                },
            });

            petDetails.images.push(`v${result.version}/${result.public_id}`);

            const updatedPetDetails = await PetIFormModel.findOneAndUpdate(
                { _id },
                { images: petDetails.images },
                { new: true }
            );

            res.status(200).json({ images: updatedPetDetails.images });
        }
    } catch (error) {
        console.log(error);
        res.status(error.statusCode).json({ errorMessage: error.message });
    }
};

const deleteCarouselImage = async (req, res) => {
    try {
        const { _id, index } = req.params;

        const petDetails = await PetIFormModel.findOne({ _id });

        const strArr = petDetails.images[index].split('/');
        const deleteImageResult = await cloudinary.uploader.destroy(`${strArr[1]}/${strArr[2]}`);
        console.log(deleteImageResult);

        if (deleteImageResult.result == "ok") {
            petDetails.images.splice(index, 1);

            const newPetDetails = await PetIFormModel.findOneAndUpdate(
                { _id },
                { images: petDetails.images },
                { new: true }
            );

            res.status(200).json({ message: "Deleted Successfully" });
            return;
        }

        res.status(412).json({ message: "Deletion Failed" });

    } catch (error) {
        console.log(error);
        res.status(error.statusCode).json({ message: error.message });
    }
};

const postNewPet = async (req, res) => {
    try {
        const { email } = req.user;
        const newPetDetails = req.body;

        const petDetails = await PetIFormModel.create({
            ...newPetDetails,
            owner: email,
        });

        console.log(petDetails);
        res.status(200).json({
            profilePic: petDetails.profilePic,
            name: petDetails.name,
            _id: petDetails._id,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
}

const deletePet = async (req, res) => {
    try {
        const { _id } = req.params;
        const { email } = req.user;

        const petDetails = await PetIFormModel.findOneAndDelete({ _id, owner: email });

        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        res.status(error.status).json({ message: "Deleted unSuccessfully" });
    }
}

const updateMissing = async (req, res) => {
    try {
        const { isMissing, _id } = req.body;

        const petDetails = await PetIFormModel.findOneAndUpdate(
            { _id },
            { isMissing },
            { new: true }
        );

        res.status(200).json({ isMissing: petDetails.isMissing });
    } catch (error) {
        res.status(error.status).json({ error: error.message });
    }
}

module.exports = {
    getPetProfileDetails,
    updatePetDetails,
    updateMedicalDetails,
    updateOwnerDetails,
    updateMessageDetails,
    updateNameDetails,
    carouselImage,
    deleteCarouselImage,
    postNewPet,
    deletePet,
    updateMissing
};
