const express = require('express');
const cors = require('cors');
const app = express();
const authenticationRouter = require('./routes/authentication');
const authenticateToken = require('./middleware/authorization');
require('dotenv').config();
const connectDB = require('./db/connectDB');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/pawfile', authenticationRouter);
app.use(authenticateToken);

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);

        app.listen(port, () => {
            console.log(`Server is listening to Port ${port}`);
        })
    }
    catch (err) {
        console.log(err);
    }
}

start();