const pool = require('../config/database');
const errorHandler = require('../util/errorHandler');
const sqlLib = require('../util/sqlLib');

module.exports = {
    // CRUD
    async createComment(req, res) {
        var comment = {...req.body};

        try {
            var query = await pool.query(sqlLib.buildCreateQuery(comment, 'comment'));
            console.log({queryResult: query})
            var result = await pool.query(sqlLib.buildFindByIdQuery({comment_id: query.insertId}));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
            return;
        }

        res.status(201).send({result});
    },

    async getCommentById(req, res) {
        try {
            var result = await pool.query(sqlLib.buildFindByIdQuery({comment_id: req.params.id}));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
            return;
        }

        console.log({result});
        res.status(200).send({result});
    },

    async getComments(req, res) {
        try {
            var results = await pool.query(sqlLib.getCommentsQuery());
        } catch (error) {
           errorHandler.queryRequestErrorHandler(error, res);
           return;
        }

        console.log({results});
        res.status(200).send({results});
    },

    async updateComment(req, res) {
        const comment = {...req.body};

        try {
            await pool.query(sqlLib.buildUpdateQuery(comment));
            var result = await pool.query(sqlLib.buildFindByIdQuery(comment));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
            return;
        }

        console.log({result});
        res.status(200).send({result});
    },

    async deleteComment(req, res) {
        try {
            var result = await pool.query(sqlLib.buildDeleteQuery({comment_id: req.params.id}));
            if (result.affectedRows === 0) throw new Error('Wrong comment id');
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
            return;
        }

        res.status(200).send({result});
    },
    // End of CRUD Operations

};
