// We need to get access to the express module, to use the Router.
const express = require('express');
const router = express.Router();
const BlogModel = require('../../models/blog.model');
const mongoose = require('mongoose');

// Grab auth & token services.
const tokenService = require('../../services/token-service');
const authService = require('../../services/auth-service');

router.get('/', async (req, res) => {
    res.status(200).json(await BlogModel.find({}));
});

// We only want users with the ADMIN role to be able to make blogs. 
router.post('/', tokenService.tokenMiddleware, async (req, res) => {
    // First, verify the user can even make blogs...
    if (authService.verifyUserIsAdmin(req.token)) {
        // Now, take their data and make a blog.
        let { title, authorId, content } = req.body;
        authorId = new mongoose.mongo.ObjectId(authorId);

        const newBlog = new BlogModel({ title, authorId, content });
        const blogDoc = await newBlog.save();

        res.status(200).json({ blog: blogDoc });
    }
});

// We only want the admin that posted the blog, to be able to edit their
// own blog.
router.patch('/:blogId', tokenService.tokenMiddleware, async (req, res) => {
    if (authService.verifyUserIsAdmin(req.token)) {
        // Now let's take the data, and see what we can use.
        let blogId = req.params.blogId;
        let { title, content, modifierId } = req.body;

        try {
            const foundBlog = await BlogModel.findOne({ _id: blogId });
            console.log(foundBlog);

            // Confirm that the user is the original author.
            if (foundBlog.authorId.equals(modifierId)) {
                const updatedBlogDoc = await BlogModel.findByIdAndUpdate(blogId, { title, content });
                res.status(200).json(updatedBlogDoc);
            } else {
                res.status(401).send('Unauthorized to make this change to the blog.');
            }
        } catch(err) {
            console.error(err);
            res.status(401).send('Unauthorized.');
        }
    }
});

// At the very end, export this using module.exports ES5 export syntax.
module.exports = router;