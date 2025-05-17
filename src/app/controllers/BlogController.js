const Blog = require('../models/Blog');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class BlogControoler {
    // [GET] /blog
    index(req, res, next) {
        Blog.find({})
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
                res.render('blogs', {
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
        const formData = req.body;
        console.log(formData.slug);
        console.log(formData);
        Blog(formData)
            .save()
            .then(() => res.redirect(`/blogs/${formData.slug}`))
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
        Blog.findById(req.params.id)
            .deleteOne()
            .then(() => res.redirect('/me/my-blogs'))
            .catch(next);
    }
}

module.exports = new BlogControoler();
