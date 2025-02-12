const mongoose = require('mongoose');
const { Schema } = mongoose;

const Users = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    name: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        min: 11
    },
    address: {
        type: String
    }
});

const UsersModel = mongoose.model('Users', Users);
module.exports = { UsersModel };