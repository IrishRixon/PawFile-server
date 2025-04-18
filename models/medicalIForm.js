const mongoose = require('mongoose');
const { Schema } = mongoose;

const medicalIFormSchema = new Schema({
    petName: {
        type: String,
        default: 'No name'
    },
    vetClinicName: {
        type: String,
        default: ''
    },
    vetClinicPhoneNumber: {
        type: String,
        default: ''
    },
    vaccination: {
        type: String,
        default: ''
    },
    allergies: {
        type: String,
        default: ''
    },
    medications: {
        type: String,
        default: ''
    },
});

const MedicalIFormModel = mongoose.model('MedicalIForm', medicalIFormSchema);

module.exports = MedicalIFormModel;