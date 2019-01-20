const pool = require('../config/database');
const sha1 = require('crypto-js/sha1');
const sqlLib = require('../util/sqlLib');

module.exports = {
    // CRUD
    async createUser(user) {
        var query = await pool.query(sqlLib.buildCreateQuery(user, 'user'));
        var result = pool.query(sqlLib.buildFindByIdQuery({user_id: query.insertId}));

        return result;
        
    },

    async getUserById(id) {
        var result = pool.query(sqlLib.buildFindByIdQuery({user_id: id}));

        return result;        
    },

    async getUsers() {
        var results = pool.query(sqlLib.getUsersQuery());

        return results;
    },

    async updateUser(user) {
        if (user.password) user.password = sha1(user.password);

        await pool.query(sqlLib.buildUpdateQuery(user));
        var result = pool.query(sqlLib.buildFindByIdQuery(user));

        return result;
        
    },

    async deleteUser(id) {
        await pool.query(sqlLib.buildDeleteQuery({user_id: id}));
        if (result.affectedRows === 0) throw new Error('Wrong user id');
    },
    // End of CRUD Operations

    async searchUser(elem) {
        pool.query(sqlLib.buildFindByElemQuery(elem, 'user'));
    }
};
