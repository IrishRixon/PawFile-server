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
        type: String,
        default: ''
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
        default: '/v1747358241/8665281_dog_animal_icon_rqplbp.jpg'
    },
    images: {
        type: [String],
        default: []
    },
    isMissing: {
        type: Boolean,
        default: false
    }
});
 
const PetIFormModel = mongoose.model('PetIForm', PetISchema);

module.exports = PetIFormModel;