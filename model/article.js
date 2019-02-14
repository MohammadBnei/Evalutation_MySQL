const pool = require('../config/database');
const sqlLib = require('../util/sqlLib');

module.exports = {
    // CRUD
    async createArticle(article, categories) {
        var query = await pool.query(sqlLib.buildCreateQuery(article, 'article'));
        if (categories) categories.forEach((category) => pool.query(sqlLib.buildCreateQuery({
            category_id: category.category_id,
            article_id: article.article_id}, 'article_category')));
        
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

    async updateArticle(article, categories) {
        await pool.query(sqlLib.buildUpdateQuery(article));
        if (categories) categories.forEach((category) => pool.query(sqlLib.buildCreateQuery({
            category_id: category.category_id,
            article_id: article.article_id}, 'article_category')));
        var result = pool.query(sqlLib.buildFindByIdQuery(article));

        return result;
    },

    async deleteArticle(id) {
        var result = await pool.query(sqlLib.buildDeleteQuery({article_id: id}));
        if (result.affectedRows === 0) throw new Error('Wrong article id');
    },
    // End of CRUD Operations

    async getArticlesByUser(user_id) {
        var results = pool.query(sqlLib.buildFindElemByModelQuery('article', {user_id}));

        return results;
    },

    async searchArticle(words, categories) {
        var result = pool.query(sqlLib.buildSearchArticlesByWordsAndCategoriesQuery(words, categories));

        return result;
    },
};
