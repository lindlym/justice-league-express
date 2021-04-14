const express = require('express');
const app = express();
const PORT = 3001;

// Import third-party middlewares, and register them in the server.
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Create JWT token secret, and import users from the data folder.
const accessTokenSecret = 'justiceleague';
const users = require('./data/users');

const verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        console.log('hello');
        // If header is undefined, we need to return a 401 status (Unauthorized)...
        res.sendStatus(401);
    }
}

app.get('/user/data', verifyToken, (req, res) => {
    console.log('I made it into this route');
    // Verify the JWT token provided by the user’s request!
    jwt.verify(req.token, accessTokenSecret, (err, authorizedData) => {
        if (err) {
            // If there’s an error... send unauthorized (401 HTTP Status)
            console.log('Error... could not connect to the protected route.');
            res.sendStatus(401);
        } else {
            // If token is successfully verified, we can send the authorized data..           
            res.json({
                message: 'Successful login!',
                authorizedData,
                batman: users[1]
            });

            console.log('Success... connected to protected route.');
        }
    })
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);
        res.json({ accessToken });
    } else {
        res.send('Username or password incorrect...');
    }
});

// Tell the server what port to listen on. 
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));