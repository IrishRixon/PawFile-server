const UserIFormModel = require("../models/userInitialForm");
const PetIFormModel = require('../models/petInitialForm');

const submitInitialUserForm = async (req, res) => {
    try {
        const { email } = req.user;
        const userInfo = { ...req.body, email };

        const userIForm = await UserIFormModel.create(userInfo);
         
        return res.status(200).json({ res: { isSuccess: true } });

    } catch (err) {
        return res.status(409).json({ res: { isSuccess: false, message: err } });
    }
};

const submitInitialPetForm = async (req, res) => {
    try {
        const { email } = req.user;
        const petInfo = { ...req.body, email };

        const petIForm = await PetIFormModel.create(petInfo);

        return res.status(200).json({ res: { isSuccess: true } });
    }
    catch(err) {
        return res.status(409).json({ res: { isSuccess: false, message: err } });
    }
};

module.exports = {
    submitInitialUserForm,
    submitInitialPetForm,
};
