const { mongoose } = require('mongoose');

const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        name: { type: String },
        content: { type: String },
        desc: { type: String },
        view: { type: Number },
        slug: { type: String },
    },
    {
        timestamps: true,
    },
);

Blog.pre('save', function (next) {
    if (!this.slug && this.name) {
        this.slug = this.name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }
    next();
});

module.exports = mongoose.model('Blog', Blog);
