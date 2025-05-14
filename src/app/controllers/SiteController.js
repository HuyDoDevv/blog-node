class SiteControoler {
    // [GET] /Site
    index(red, res) {
        res.render('home');
    }
}

module.exports = new SiteControoler();
