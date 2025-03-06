const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authenticationRouter = require("./routes/authentication");
const authenticateToken = require("./middleware/authorization");
const initialFormRouter = require("./routes/initialForms");
require("dotenv").config();
const connectDB = require("./db/connectDB");

const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true, // Allow cookies to be sent
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"], // Expose Set-Cookie header to the client
    methods: ["GET", "PUT", "POST", "DELETE"],
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use("/pawfile", authenticationRouter);
app.use(authenticateToken);
app.use("/pawfile", initialFormRouter);

const port = 3000;

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
