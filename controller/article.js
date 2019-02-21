const errorHandler = require('../util/errorHandler');
const articleModel = require('../model').articleModel;

module.exports = {
    // CRUD
    async createArticle(req, res) {
        try {
            let article = req.body;
            let categories = article.categories;
            article.categories = null;

            let result = await articleModel.createArticle(article, categories);

            res.status(201).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async getArticleById(req, res) {
        try {
            let result = await articleModel.getArticleById(req.params.id);

            res.status(200).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async getArticles(req, res) {
        try {
            let results = await articleModel.getArticles();

            res.status(200).send(results);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async updateArticle(req, res) {
        try {
            let article = req.body;
            let categories = req.body.categories;
            let result = await articleModel.updateArticle(article, categories);

            res.status(200).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async deleteArticle(req, res) {
        try {
            await articleModel.deleteArticle(req.params.id);

            res.status(200).send('Ok');
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },
    // End of CRUD Operations

    // Get all articles from a user
    async getArticlesByUser(req, res) {
        const user_id = req.params.id;

        try {
            let results = await articleModel.getArticlesByUser(user_id);

            res.status(200).send(results);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async searchArticle(req, res) {
        var words = req.body.words;
            categories = req.body.categories;

        console.log({words, categories})

        try {
            let results = await articleModel.searchArticle(words, categories);

            res.status(200).send(results);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    }
};