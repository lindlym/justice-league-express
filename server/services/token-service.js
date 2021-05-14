const jwt = require('jsonwebtoken');

// Create JWT token secret.
const TOKEN_SECRET = 'justiceleague';

const tokenMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        req.token = header.split(' ')[1];
        next();
    } else {
        // If header is undefined, we need to return a 401 status (Unauthorized)...
        res.status(401).send('You are not authorized to do this.');
    }
}

function verifyToken(token) {
    return jwt.verify(token, TOKEN_SECRET);
}

function createToken(payload) {
    console.log(payload);
    return jwt.sign(payload, TOKEN_SECRET);
}

module.exports = { tokenMiddleware, TOKEN_SECRET, verifyToken, createToken };