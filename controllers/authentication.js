const { UsersModel } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

const saltRounds = 10;

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
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
                        sameSite: 'strict'
                    });
                    console.log("Cookie: ", res.get("Set-Cookie"));
                    res.status(200).json({ res: {isSuccess: true }});
                } else {
                    res.status(200).json({res: {isSuccess: false, message:'Incorrect credentials' }});
                }
            });
        } else {
            res.json({res: {isSuccess: false, message:'Account does not exist' }});
        }
    } catch (error) {
        console.log(error);
    }
};

let verificationCode;
let codeDateSent;
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

This code is valid for 5 minutes

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
            codeDateSent = new Date().getTime();
            console.log("Email sent: " + info.response);
            res.status(200).json({ message: "Email sent" });
        }
    });
};


const verifyCode = async (req, res) => {
    const { code } = req.body;
    
    if(code == verificationCode){
        if(new Date().getTime() - codeDateSent > 300000){
            return res.status(200).json({ codeExpired: true });
        }
        res.status(200).json({ isMatch: true });
    }
    else {
        res.status(200).json({ isMatch: false });
    }
}

const findAccount = async (req, res) => {
    const { email } = req.body;

    const user = await UsersModel.findOne({ email });

    if(user) {
        res.status(200).json({ res: { isSuccess: true } });
    }
    else {
        res.status(201).json({ res: { isSuccess: false } });
    }
}

const changePassword = async (req, res) => {
    const { email, oldPass, newPass } =  req.body;

    const user = await UsersModel.findOne({ email });

    bcrypt.compare(oldPass, user.password, (err, result) => {
        if(err) {
            res.status(202).json({res: { isSuccess: false, message: err }});
            return;
        }
        else if(result) {   
            bcrypt.hash(newPass, saltRounds, async (err, hash) => {
                if(err) {
                    res.status(202).json({res: { isSuccess: false, message: err }});
                    return;
                }
                else if(hash) {
                    const updatedUser = await UsersModel.updateOne({ email }, { password: hash});
                    res.status(200).json({res: { isSuccess: true }});
                }
            })
        }
        else {
            res.status(202).json({res: { isSuccess: false, message: 'Old password does not matched'}});
        }
    })
}

module.exports = {
    signUp,
    signIn,
    emailVerification,
    verifyCode,
    findAccount,
    changePassword
};
