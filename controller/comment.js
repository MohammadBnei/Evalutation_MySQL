const errorHandler = require('../util/errorHandler');
const commentModel = require('../model').commentModel;

module.exports = {
    // CRUD
    async createComment(req, res) {
        var newComment = {...req.body,
            user_id: req.user.user_id};
        try {
            let result = await commentModel.createComment(newComment);

            res.status(201).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async getCommentById(req, res) {
        try {
            let result = await commentModel.getCommentById(req.params.id);
            
            res.status(200).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async getComments(req, res) {
        try {
            let results = await commentModel.getComments();
        
            res.status(200).send(results);
        } catch (error) {
           errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async updateComment(req, res) {
        try {
            let comment = {...req.body, comment_id: req.params.id};
            let result = await commentModel.updateComment(comment);

            res.status(200).send(result);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async deleteComment(req, res) {
        try {
            await commentModel.deleteComment(req.params.id);
            
            res.status(200).send('Ok');
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },
    // End of CRUD Operations

    // Get all comments from a user
    async getCommentsByUser(req, res) {
        const user_id = req.params.id || req.user.user_id;
        try {
            let results = await commentModel.getCommentsByUser(user_id);

            res.status(200).send(results);
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    // Get all comments from an article
    async getCommentsByArticle(req, res) {
        try {
            let results = await commentModel.getCommentsByArticle(req.params.id);

            res.status(200).send({results});
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    }
};
