
const siteRouter=require('./sites');
function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    // if(req.session.authenticated != true)
    // {
    //     return res.redirect('/authen-verify');
    // }
    next();
}
function router(app)
{
    app.use('/', siteRouter)

}

module.exports = router