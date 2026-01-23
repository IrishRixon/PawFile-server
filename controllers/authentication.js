const { UsersModel } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const sgMail = require('@sendgrid/mail')

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
                        path: "/", // Accessible across all paths
                        sameSite: "None"
                    });
                    console.log("Cookie: ", res.get("Set-Cookie"));
                    res.status(200).json({ res: { isSuccess: true } });
                } else {
                    res.status(200).json({ res: { isSuccess: false, message: 'Incorrect credentials' } });
                }
            });
        } else {
            res.json({ res: { isSuccess: false, message: 'Account does not exist' } });
        }
    } catch (error) {
        console.log(error);
    }
};

let verificationCode;
let codeDateSent;
const emailVerification = async (req, res) => {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    // const userEmail = req.body.email;
    // let min = 100000;
    // let max = 1000000;
    // verificationCode = crypto.randomInt(min, max);

    const msg = {
        to: 'rixondelapena@gmail.com', // Change to your recipient
        from: 'irishrixon@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
};


const verifyCode = async (req, res) => {
    const { code } = req.body;

    if (code == verificationCode) {
        if (new Date().getTime() - codeDateSent > 300000) {
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

    if (user) {
        res.status(200).json({ res: { isSuccess: true } });
    }
    else {
        res.status(201).json({ res: { isSuccess: false } });
    }
}

const changePassword = async (req, res) => {
    const { email, oldPass, newPass } = req.body;

    const user = await UsersModel.findOne({ email });

    // bcrypt.compare(oldPass, user.password, (err, result) => {
    //     if(err) {
    //         res.status(202).json({res: { isSuccess: false, message: err }});
    //         return;
    //     }
    //     else if(result) {   
    //         bcrypt.hash(newPass, saltRounds, async (err, hash) => {
    //             if(err) {
    //                 res.status(202).json({res: { isSuccess: false, message: err }});
    //                 return;
    //             }
    //             else if(hash) {
    //                 const updatedUser = await UsersModel.updateOne({ email }, { password: hash});
    //                 res.status(200).json({res: { isSuccess: true }});
    //             }
    //         })
    //     }
    //     else {
    //         res.status(202).json({res: { isSuccess: false, message: 'Old password does not matched'}});
    //     }
    // })

    bcrypt.hash(newPass, saltRounds, async (err, hash) => {
        if (err) {
            res.status(202).json({ res: { isSuccess: false, message: err } });
            return;
        }
        else if (hash) {
            const updatedUser = await UsersModel.updateOne({ email }, { password: hash });
            res.status(200).json({ res: { isSuccess: true } });
        }
    })
}

const logOut = async (req, res) => {
    console.log("Cookie: ", res.get("Set-Cookie"));
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        path: "/", // Accessible across all paths
        sameSite: "None"
    });
    console.log("Cookie: ", res.get("Set-Cookie"));
    res.status(200).json({});
}

module.exports = {
    signUp,
    signIn,
    emailVerification,
    verifyCode,
    findAccount,
    changePassword,
    logOut
};
