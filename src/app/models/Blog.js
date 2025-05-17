const { mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
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

module.exports = mongoose.model('Blog', Blog);
