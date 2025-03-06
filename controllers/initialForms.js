const UserIFormModel = require("../models/userInitialForm");

const submitInitialUserForm = async (req, res) => {
    try {
        const { email } = req.user;
        const userInfo = { ...req.body, email };

        const userIForm = await UserIFormModel.create(userInfo);
        
        return res.status(200).json({ res: { isSuccess: true } });

    } catch (err) {
        return res.status(201).json({ res: { isSuccess: false, message: err } });
    }
};

const submitInitialPetForm = async (req, res) => {
    res.status(200).json({ body: req.body });
};

module.exports = {
    submitInitialUserForm,
    submitInitialPetForm,
};
