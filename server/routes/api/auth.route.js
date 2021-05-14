// We need to get access to the express module, to use the Router.
const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user.model');

// Import any auth stuff we need.
const bcryptService = require('../../services/bcrypt-service');
const tokenService = require('../../services/token-service');

// If they hit /api/auth/signup then they need to be authenticated.
router.post('/signup', async (req, res) => {
    const { username, password, email, firstName, lastName } = req.body;

    // If we're signing up a user, we CANNOT and SHOULD NOT ever have 
    // plain text passwords saved in a database. So let's encrypt them
    // with bcrypt!
    const hashedPassword = await bcryptService.hashPassword(password);

    // Use the database to verify the user here.
    const newUser = new UserModel({
        username, password: hashedPassword, email, firstName, lastName
    });

    newUser.save().then(async (document) => {
        // Remove the password from the document, so it is not stored in the
        // JWT because we should not be sending passwords back from the server
        // pretty much ever.
        document = document.toJSON();
        delete document.password;

        const userToken = await tokenService.createToken({ _id: document._id });
        res.status(200).json({ ...document, userToken });
    }).catch(error => {
        console.error(error);
        res.status(401).send('User failed to save to the database.');
    });
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        let foundUser = await UserModel.find({ username });

        if (await bcryptService.checkPassword(password, foundUser[0].password)) {
            foundUser = foundUser[0].toJSON();
            delete foundUser.password;

            const userToken = tokenService.createToken(foundUser);
            res.status(200).json({ userToken, ...foundUser })
        } else {
            res.status(401).send('Incorrect username or password.');
        }
    } catch(err) {
        console.error(err);
        res.status(401).send('Incorrect username or password.');
    }
});

// At the very end, export this using module.exports ES5 export syntax.
module.exports = router;