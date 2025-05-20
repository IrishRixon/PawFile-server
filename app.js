const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authenticationRouter = require("./routes/authentication");
const initialFormRouter = require("./routes/initialForms");
const singleImageUploadRouter = require('./routes/singleImageUpload');
const petCardsRouter = require('./routes/dashboard/petcards');
const petProfileDetailsRouter = require('./routes/dashboard/petProfileDetails');
const authenticateToken = require("./middleware/authorization");
require("dotenv").config();
const connectDB = require("./db/connectDB");


const corsOptions = {
    origin: "https://pawfile.netlify.app",
    credentials: true, // Allow cookies to be sent
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"], // Expose Set-Cookie header to the client
    methods: ["GET", "PUT", "POST", "DELETE"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/pawfile", authenticationRouter);
app.use(authenticateToken);
app.use("/pawfile", initialFormRouter);
app.use('/pawfile', singleImageUploadRouter);
app.use('/pawfile/dashboard', petCardsRouter);
app.use('/pawfile/dashboard', petProfileDetailsRouter);

const port = 3000 || process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);

        app.listen(port, () => {
            console.log(`Server is listening to Port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();
