const { UsersModel } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const saltRounds = 10;
        let hashedPassword;

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                res.status(500).json({ message: "Error hashing password" });
            }

            hashedPassword = hash;

            const userObject = {
                email,
                password: hashedPassword,
            };

            const user = await UsersModel.create(userObject);
            res.status(200).json(user);
        });
    } catch (error) {
        console.log(error);
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UsersModel.findOne({ email });

        if (user) { 
            hashedPassword = user.password;
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if(err) {
                    res.status(500).json({ message: "Error comparing passwords" });
                }
                else if (result) {
                    const jwtToken = jwt.sign({email}, process.env.JWT_SECRETKEY)
                    res.status(200).json({ jwtToken });
                } else {
                    res.status(200).json({ message: "Incorrect Password" });
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signUp,
    signIn,
};
