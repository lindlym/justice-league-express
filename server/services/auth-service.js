const tokenService = require('./token-service');

function verifyUserIsAdmin(token) {
    // First, verify the user can even make blogs...
    const user = tokenService.verifyToken(token);
    if (!user.roles.includes('ADMIN')) return res.status(401).send('Unauthorized.');
    else return true;
}

module.exports = { verifyUserIsAdmin };