const Blog = require('../models/Blog');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class BlogControoler {
    // [GET] /blog
    async index(red, res) {
        try {
            const blogs = await Blog.find({});
            res.render('blog', {
                blogs: mutipleMongooseToObject(blogs),
            });
        } catch (error) {
            res.status(400).json({ error: 'Error!' });
        }
    }

    show(red, res) {
        res.send('blog details');
    }
}

module.exports = new BlogControoler();
