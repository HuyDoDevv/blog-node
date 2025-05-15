const { mongoose } = require('mongoose');

const Schema = mongoose.Schema;

const Blog = new Schema({
    name: { type: String },
    content: { type: String },
    desc: { type: String },
    view: { type: Number },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', Blog);
