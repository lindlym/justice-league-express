const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
require('./database'); // Does this automatically start the db?

// Import Express middlewares here.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import third-party middlewares, and register them in the server.
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cookieParser());
app.use(cors());

// Set up our routes here for handling authentication.
app.use('/api/auth', require('./routes/api/auth.route'));
app.use('/api/blogs', require('./routes/api/blogs.route'));
app.use('/api/users', require('./routes/api/users.route'));

// Tell the server what port to listen on. 
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));