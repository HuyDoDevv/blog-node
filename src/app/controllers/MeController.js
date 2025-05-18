const Blog = require('../models/Blog');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /blog
    index(req, res, next) {
        Promise.all([
            Blog.find({}),
            Blog.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([blogs, countDelete]) =>
                res.render('me/my-blogs', {
                    countDelete,
                    blogs: mutipleMongooseToObject(blogs),
                }),
            )
            .catch(next);
    }

    trash(req, res, next) {
        Blog.findWithDeleted({ deleted: true }).then((blogs) =>
            res.render('me/trash', {
                blogs: mutipleMongooseToObject(blogs),
            }),
        );
    }
}

module.exports = new MeController();
