module.exports = {
    createArticle(req, res, next) {
        const article = {...req.body};

        if (!req.isAuthenticated()) throw new Error('No user connected');
        else if (!req.session.user.isAdmin) throw new Error('User is not an Admin');

        if (!article.title || !article.content) throw new Error('Some fields are empty');

        next();
    }
};
