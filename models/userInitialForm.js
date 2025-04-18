const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserIFormSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    address: {
        street: {
            type: String,
            default: ''
        },
        barangay: {
            type: String,
            default: ''
        },
        municipality: {
            type: String,
            default: ''
        },
        province: {
            type: String,
            default: ''
        },
    },
    profilePic: {
        type: String,
        default: null
    }
});

const UserIFormModel = mongoose.model('UserIForm', UserIFormSchema);

module.exports = UserIFormModel;