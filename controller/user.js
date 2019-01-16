const pool = require('../config/database');
const crypt = require('../util/crypt');
const errorHandler = require('../util/errorHandler');
const sqlLib = require('../util/sqlLib');

module.exports = {
    // CRUD
    async createUser(req, res) {
        let user = {...req.body};
        user.password = crypt.SHA1(user.password);

        try {
            var query = await pool.query(sqlLib.buildCreateQuery(user, 'user'));
            var result = await pool.query(sqlLib.buildFindByIdQuery({user_id: query.insertId}));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }

        console.log({result});
        res.status('201').send({result});
    },

    async getUserById(req, res) {
        try {
            var result = await pool.query(sqlLib.buildFindByIdQuery({user_id: req.params.id}));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }

        console.log({result});
        res.status('200').send({result});
    },

    async getUsers(req, res) {
        try {
            var results = await pool.query(sqlLib.getUsersQuery());
        } catch (error) {
           errorHandler.queryRequestErrorHandler(error, res);
        }

        console.log({results});
        res.status('200').send({results});
    },

    async updateUser(req, res) {
        const user = {...req.body};

        if (user.password) user.password = crypt.SHA1(user.password);

        try {
            await pool.query(sqlLib.buildUpdateQuery(user));
            var result = await pool.query(sqlLib.buildFindByIdQuery(user));
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }

        console.log({result});
        res.status('200').send({result});
    },

    async deleteUser(req, res) {
        try {
            var result = await pool.query(sqlLib.buildDeleteQuery({user_id: req.params.id}));
            if (result.affectedRows === 0) console.log('No item deleted');
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }

        console.log({result});
        res.status('200').send({result});
    },
    // End of CRUD Operations

    // Signup
    async signUp(req, res) {
        var newUser = {...req.body};

        try {
            var result = await pool.query(sqlLib.buildFindByElemQuery({email: newUser.email}, 'user'));

            if (result.length) throw new Error('Email taken');

            module.exports.createUser(req, res);

            req.login(res.get('result'), (err) => console.log('logged in', err))
        } catch (error) {
            errorHandler.queryRequestErrorHandler(error, res);
        }
    },

    async signIn(req, res) {
        res.status('200').send({loggedIn: true});
    },
}