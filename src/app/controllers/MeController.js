const Blog = require('../models/Blog');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /blog
    async index(req, res) {
        try {
            const blogs = await Blog.find({});
            res.render('me/my-blogs', {
                blogs: mutipleMongooseToObject(blogs),
            });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}

module.exports = new MeController();
