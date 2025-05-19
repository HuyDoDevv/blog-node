const Blog = require('../models/Blog');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /blog
    index(req, res, next) {
        let blogQuery = Blog.find({});

        if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
            blogQuery = blogQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([
            blogQuery,
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
