const pool = require('../config/database');
const sqlLib = require('../util/sqlLib');

module.exports = {
    // CRUD
    async createArticle(article, user, category) {
        var userColumn = {column: 'user_id', value: user.user_id};
            categoryColumn = {column: 'category_id', value: category.category_id};
            
        var query = await pool.query(sqlLib.buildCreateQuery(article, 'article', [userColumn, categoryColumn]));
        var result = pool.query(sqlLib.buildFindByIdQuery({article_id: query.insertId}));

        return result;
        
    },

    async getArticleById(id) {
        var result = pool.query(sqlLib.buildFindByIdQuery({article_id: id}));

        return result;        
    },

    async getArticles() {
        var results = pool.query(sqlLib.getArticlesQuery());

        return results;
    },

    async updateArticle(article) {
        await pool.query(sqlLib.buildUpdateQuery(article));
        var result = pool.query(sqlLib.buildFindByIdQuery(article));

        return result;
        
    },

    async deleteArticle(id) {
        var result = await pool.query(sqlLib.buildDeleteQuery({article_id: id}));
        if (result.affectedRows === 0) throw new Error('Wrong article id');
    },
    // End of CRUD Operations

    async getArticlesByAdmin(user_id) {
        var results = pool.query(sqlLib.buildFindElemByModelQuery('article', {user_id}));

        return results;
    },
};
