const mongoose = require('mongoose');
const { Schema } = mongoose;

const PetISchema = new Schema({
    email: {
        type: String
    },
    name: {
        type: String,
        default: '',
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
    }
});

const PetIFormModel = mongoose.model('PetIForm', PetISchema);

module.exports = PetIFormModel;