const UserIFormModel = require("../models/userInitialForm");
const PetIFormModel = require("../models/petInitialForm");
const MedicalIFormModel = require("../models/medicalIForm");

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
    const { email: owner } = req.user;
    const petInfo = { ...req.body, owner };

    if(petInfo.name == '') {
      petInfo.name = 'No name';
    }

    // res.status(200).send(petInfo);
    const petIForm = await PetIFormModel.create(petInfo);
    const medicalIForm = await MedicalIFormModel.create({
      petName: petIForm.name,
      vetClinicName: "",
      vetClinicPhoneNumber: "",
      vaccination: "",
      allergies: "",
      medications: "",
    });

    return res
      .status(200)
      .json({ res: { isSuccess: true, _id: petIForm._id } });
  } catch (err) {
    return res.status(409).json({ res: { isSuccess: false, message: err } });
  }
};

module.exports = {
  submitInitialUserForm,
  submitInitialPetForm,
};
