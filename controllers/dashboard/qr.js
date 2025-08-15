const UserIFormModel = require("../../models/userInitialForm");
const MedicalIFormModel = require("../../models/medicalIForm");
const PetIFormModel = require("../../models/petInitialForm");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getPetDetailsQr = async (req, res) => {
    console.log("qr");
    try {
        const { id } = req.params;
        const token = req.cookies.token;
        let isOwner = false;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRETKEY, async (err, decoded) => {
                if (err) return res.sendStatus(403);

                const email = decoded.email;

                const petDetails = await PetIFormModel.findById(id);
                const ownerDetails = await UserIFormModel.findOne({ email });
                const medicalDetails = await MedicalIFormModel.findOne({
                    email,
                });

                if (petDetails.owner == email) {
                    isOwner = true;
                }

                res.status(200).json({
                    petDetails,
                    ownerDetails,
                    medicalDetails,
                    isOwner
                });
            });
        }
        else {
            const petDetails = await PetIFormModel.findById(id);
            const email = petDetails.owner;
            const ownerDetails = await UserIFormModel.findOne({ email });
            const medicalDetails = await MedicalIFormModel.findOne({
                email,
            });

            res.status(200).json({
                petDetails,
                ownerDetails,
                medicalDetails,
                isOwner
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = getPetDetailsQr;
