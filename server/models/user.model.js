let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: false
    },
    password: {
        type: String,
        required: true,
        unique: true,
        lowercase: false
    },
    email: {
        type: String,
        required: true,
        unique: false,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true,
        unique: false,
        lowercase: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
        lowercase: false
    },
    roles: {
        type: Array,
        default: ['USER']
    }
});

module.exports = mongoose.model(`User`, userSchema);