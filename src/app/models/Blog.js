const { mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        content: { type: String },
        desc: { type: String },
        view: { type: Number },
        slug: { type: String, slug: 'name', unique: true },
        author: { type: String },
    },
    {
        _id: false,
        timestamps: true,
    },
);

mongoose.plugin(slug);
Blog.plugin(AutoIncrement);
Blog.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: true,
});

module.exports = mongoose.model('Blog', Blog);
