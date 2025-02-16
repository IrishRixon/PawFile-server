const { UsersModel } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

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
                if (err) {
                    res.status(500).json({ message: "Error comparing passwords" });
                } else if (result) {
                    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRETKEY);

                    res.cookie("token", jwtToken, {
                        httpOnly: true,
                        secure: true,
                    });
                    console.log("Cookie: ", res.get("Set-Cookie"));
                    res.status(200).json({ isLoggedIn: true });
                } else {
                    res.status(200).json({ message: "Incorrect Password" });
                }
            });
        } else {
            res.json({ message: "Account not exist" });
        }
    } catch (error) {
        console.log(error);
    }
};

let verificationCode;
const emailVerification = async (req, res) => {
    const userEmail = req.body.email;
    let min = 100000;
    let max = 1000000;
    verificationCode = crypto.randomInt(min, max);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "pawfile.official@gmail.com",
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "pawfile.official@gmail.com",
        to: userEmail,
        subject: "Verify Your Email Address for PawFie",
        text: `Greetings PawFriend,

Thank you for registering with PawFile! To complete your sign-up process, please verify your email address by entering the verification code below:

Verification Code: ${verificationCode}

If you didn't request this, please ignore this email.

Cheers,
The PawFile Team
`,
    }; //for enabling your google account to send email, got to your google acount settings and search app password

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Error sending email" });
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).json({ message: "Email sent" });
        }
    });
};

const verifyCode = async (req, res) => {
    const { code } = req.body;
    if(code == verificationCode){
        res.status(200).json({ isMatch: true });
    }
    else {
        res.status(200).json({ isMatch: false });
    }
}

module.exports = {
    signUp,
    signIn,
    emailVerification,
    verifyCode
};
