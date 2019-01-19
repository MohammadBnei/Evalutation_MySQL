const pool = require('../config/database');
const sha1 = require('crypto-js/sha1');
const errorHandler = require('../util/errorHandler');
const sqlLib = require('../util/sqlLib');

module.exports = {
    // CRUD
    async createUser(req, res, respond = true) {
        var user = {...req.body};
        user.password = sha1(user.password);

        try {
            var query = await pool.query(sqlLib.buildCreateQuery(user, 'user'));
            var result = await pool.query(sqlLib.buildFindByIdQuery({user_id: query.insertId}));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
            return;
        }

        if (respond) res.status(201).send(result[0]);
        else return result[0];
    },

    async getUserById(req, res) {
        try {
            var result = await pool.query(sqlLib.buildFindByIdQuery({user_id: req.params.id}));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
            return;
        }

        console.log({result});
        res.status(200).send(result);
    },

    async getUsers(req, res) {
        try {
            var results = await pool.query(sqlLib.getUsersQuery());
        } catch (error) {
           errorHandler.queryRequestErrorHandler(error, res);
           return;
        }

        console.log({results});
        res.status(200).send(results);
    },

    async updateUser(req, res) {
        const user = {...req.body};

        if (user.password) user.password = sha1(user.password);

        try {
            await pool.query(sqlLib.buildUpdateQuery(user));
            var result = await pool.query(sqlLib.buildFindByIdQuery(user));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
            return;
        }

        console.log({result});
        res.status(200).send(result);
    },

    async deleteUser(req, res) {
        try {
            var result = await pool.query(sqlLib.buildDeleteQuery({user_id: req.params.id}));
            if (result.affectedRows === 0) throw new Error('Wrong user id');
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
            return;
        }

        res.status(200).send(result);
    },
    // End of CRUD Operations
}