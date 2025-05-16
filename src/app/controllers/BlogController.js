const Blog = require('../models/Blog');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class BlogControoler {
    // [GET] /blog
    async index(req, res) {
        try {
            const blogs = await Blog.find({});
            res.render('blogs', {
                blogs: mutipleMongooseToObject(blogs),
            });
        } catch (error) {
            res.status(400).json({ error: 'Error!' });
        }
    }

    async show(req, res) {
        try {
            const blog = await Blog.findOne({ slug: req.params.slug });
            res.render('blogs/show', {
                blog: mongooseToObject(blog),
            });
        } catch (error) {
            res.status(400).json({ error: 'Error!' });
        }
    }

    create(req, res) {
        res.render('blogs/create');
    }

    store(req, res) {
        const blog = new Blog(req.body);
        blog.save();
        res.redirect(`/blogs/${blog.slug}`);
    }

    async edit(req, res) {
        try {
            const blog = await Blog.findById(req.params.id);
            res.render('blogs/edit', {
                blog: mongooseToObject(blog),
            });
        } catch (error) {
            res.status(400).json({ error: 'Error!' });
        }
    }

    async update(req, res) {
        try {
            await Blog.updateOne({ _id: req.params.id }, req.body);
            res.redirect('/me/my-blogs');
        } catch (error) {
            res.status(400).json({ error: 'Error!' });
        }
    }
}

module.exports = new BlogControoler();
