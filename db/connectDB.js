const mongoose = require('mongoose');

const connectDB = async (URI) => {
    try {
        return await mongoose.connect(URI);
    }
    catch(err) {
        console.log("Failed to connect to database", err);
    }
}

module.exports = connectDB;