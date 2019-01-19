const pool = require('../config/database');
const errorHandler = require('../util/errorHandler');
const sqlLib = require('../util/sqlLib');

module.exports = {
    // CRUD
    async createArticle(req, res) {
        var article = {...req.body};

        try {
            var query = await pool.query(sqlLib.buildCreateQuery(article, 'article'));
            console.log({queryResult: query})
            var result = await pool.query(sqlLib.buildFindByIdQuery({article_id: query.insertId}));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }

        res.status(201).send({result});
    },

    async getArticleById(req, res) {
        try {
            var result = await pool.query(sqlLib.buildFindByIdQuery({article_id: req.params.id}));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }

        console.log({result});
        res.status(200).send({result});
    },

    async getArticles(req, res) {
        try {
            var results = await pool.query(sqlLib.getArticlesQuery());
        } catch (error) {
           errorHandler.queryRequestErrorHandler(error, res);
        }

        console.log({results});
        res.status(200).send({results});
    },

    async updateArticle(req, res) {
        const article = {...req.body};

        try {
            await pool.query(sqlLib.buildUpdateQuery(article));
            var result = await pool.query(sqlLib.buildFindByIdQuery(article));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }

        console.log({result});
        res.status(200).send({result});
    },

    async deleteArticle(req, res) {
        try {
            var result = await pool.query(sqlLib.buildDeleteQuery({article_id: req.params.id}));
            if (result.affectedRows === 0) throw new Error('Wrong article id');
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }

        res.status(200).send({result});
    },
    // End of CRUD Operations

};
