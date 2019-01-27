const pool = require('../config/database');
const sqlLib = require('../util/sqlLib');

module.exports = {
    // CRUD
    async searchArticle(words, categories) {
        var result = pool.query(sqlLib.buildSearchByWordsAndCategories(words, categories));

        return result;
    },
    
    async searchUser(elem) {
        return pool.query(sqlLib.buildFindByElemQuery(elem, 'user'));
    }
}