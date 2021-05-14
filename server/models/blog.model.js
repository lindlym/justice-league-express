let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    content: {
        type: String,
        required: true,
        unique: false,
        lowercase: false
    },
});

let blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        lowercase: false
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false
    },
    content: {
        type: String,
        required: true,
        unique: false,
        lowercase: false
    },
    coverImageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1504770197335-6dcbb939cdc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=60',
        required: false
    },
    comments: [commentSchema]
});

module.exports = mongoose.model(`Blog`, blogSchema);