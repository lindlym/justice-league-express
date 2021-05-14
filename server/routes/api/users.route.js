// We need to get access to the express module, to use the Router.
const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user.model');

// Import any auth stuff we need.
const tokenService = require('../../services/token-service');

// Allows us to grab the user when the page is refreshed.
router.post('/getUserFromToken', async (req, res) => {
    let { token } = req.body;
    let tokenInfo = tokenService.verifyToken(token);

    // Grab the user that we have an id from, based on their
    // token.
    UserModel.findOne({ _id: tokenInfo._id })
        .then((result) => {
            delete result._doc.password;
            res.status(200).json({ ...result._doc });
        })
        .catch((error) => {
            console.error(error);
            res.status(401).send('Unauthorized.');
        })
});

// At the very end, export this using module.exports ES5 export syntax.
module.exports = router;