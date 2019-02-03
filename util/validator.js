const errorHandler = require('./errorHandler');

module.exports = {
    createArticle(req, res, next) {
        const article = req.body.article;
        const category = req.body.category;

        try {
            if (!req.isAuthenticated()) throw new Error('No user connected');
            
            if (!req.user.isAdmin) throw new Error('User is not an Admin');

            if (!article.title || !article.content || !category) throw new Error('Some fields are empty');

            if (!category.length) throw new Error('No category selected');

            console.log('Request Body ok for article creation');
            next();   
        } catch (error) {
            console.error(error);
            res.status(400).send(error);
        }
    },

    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) next();

        res.status(403).send('User is not authenticated');
    }
};
