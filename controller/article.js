const errorHandler = require('../util/errorHandler');
const articleModel = require('../model').articleModel;

module.exports = {
    // CRUD
    async createArticle(req, res) {
        try {
            let result = await articleModel.createArticle(req.body.article, req.user, req.body.category);

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
            let result = await articleModel.updateArticle(req.body);

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

    // Get all articles from an admin
    async getArticlesByAdmin(req, res) {
        const user_id = req.params.id || req.user.user_id;

        try {
            let results = await articleModel.getArticlesByUser(user_id);

            res.status(200).send(results);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },
};
