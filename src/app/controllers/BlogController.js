const Blog = require('../models/Blog');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class BlogControoler {
    // [GET] /blog
    index(req, res, next) {
        Blog.find()
            .then((blogs) =>
                res.render('blogs', {
                    blogs: mutipleMongooseToObject(blogs),
                }),
            )
            .catch(next);
    }

    // [GET] /blog/:slug
    show(req, res, next) {
        Blog.findOne({ slug: req.params.slug })
            .then((blog) =>
                res.render('blogs/show', {
                    blog: mongooseToObject(blog),
                }),
            )
            .catch(next);
    }

    // [GET] /create
    create(req, res) {
        res.render('blogs/create');
    }

    // [POST] /store
    store(req, res, next) {
        Blog(req.body)
            .save()
            .then(() => res.redirect('/me/my-blogs'))
            .catch(next);
    }

    // [POST] /blog/:id
    edit(req, res, next) {
        Blog.findById(req.params.id)
            .then((blog) =>
                res.render('blogs/edit', {
                    blog: mongooseToObject(blog),
                }),
            )
            .catch(next);
    }

    // [PUT] /blog/:id
    update(req, res, next) {
        Blog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/my-blogs'))
            .catch(next);
    }

    // [DELETE] /blog/:id
    delete(req, res, next) {
        Blog.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/my-blogs'))
            .catch(next);
    }

    // [PATCH] /blog/:id/retore
    retore(req, res, next) {
        Blog.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/trash'))
            .catch(next);
    }

    // [DELETE] /blog/:id/forceDelete
    forceDelete(req, res, next) {
        Blog.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash'))
            .catch(next);
    }
}

module.exports = new BlogControoler();
