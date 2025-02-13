const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(token === null) res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRETKEY, (err, email) => {
        if(err) res.sendStatus(403);
        req.email = email;
        next();
    });
}

module.exports = authenticateToken;