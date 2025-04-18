const mongoose = require('mongoose');
const { Schema } = mongoose;

const PetISchema = new Schema({
    owner: {
        type: String
    },
    message: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: 'No name',
        unique: true
    },
    species: {
        type: String,
        default: ''
    },
    breed: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        default: ''
    },
    temperament: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    profilePic: {
        type: String,
        default: null
    },
    images: {
        type: [String],
        default: []
    }
});

const PetIFormModel = mongoose.model('PetIForm', PetISchema);

module.exports = PetIFormModel;