const { mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        name: { type: String },
        content: { type: String },
        desc: { type: String },
        view: { type: Number },
        slug: { type: String, slug: 'name', unique: true },
        author: { type: String },
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(slug);
Blog.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Blog', Blog);
