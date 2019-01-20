const { check, body, validationResult } = require('express-validator/check');
module.exports = {
    async createArticle(req, res, next) {
        const article = req.body.article;

        if (!req.isAuthenticated()) throw new Error('No user connected');
        else if (!req.user.isAdmin) throw new Error('User is not an Admin');

        if (!article.title || !article.content) throw new Error('Some fields are empty');

        next();
    }
};
