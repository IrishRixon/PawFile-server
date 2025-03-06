const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    console.log('hello');
    const token = req.cookies.token;

    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.user = { email: decoded.email };
        console.log(decoded, 'authorization');
        next();
    });
}

module.exports = authenticateToken;