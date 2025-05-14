class NewsControoler {
    // [GET] /news
    index(red, res) {
        res.render('news');
    }

    show(red, res) {
        res.send('news details');
    }
}

module.exports = new NewsControoler();
