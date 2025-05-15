const newRouter = require('./blog');
const siteRouter = require('./site');

function route(app) {
    app.use('/blog', newRouter);
    app.use('/', siteRouter);
}

module.exports = route;
