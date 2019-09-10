
module.exports.auth = function(req, res, next) {
    const { user } = req.headers;
    
    if (!user) {
        res.status(502).json({error: "você precisa estar logado"});
    }
    return next();
}
