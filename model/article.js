const pool = require('../config/database');
const sqlLib = require('../util/sqlLib');
const categoryModel = require('./category');

module.exports = {
    // CRUD
    async createArticle(article, categories) {
        var query = await pool.query(sqlLib.buildCreateQuery(article, 'article'));
        if (categories) await pool.query(sqlLib.buildCategoryLinkToArticle(query.insertId, categories));
        
        var result = pool.query(sqlLib.buildFindByIdQuery({article_id: query.insertId}));

        return result;
        
    },

    async getArticleById(id) {
        var result = await pool.query(sqlLib.buildFindByIdQuery({article_id: id}));
        result.categories = pool.query(categoryModel.getCategoriesFromArticles(id));

        return result;        
    },

    async getArticles() {
        var results = await pool.query(sqlLib.getArticlesQuery());

        if (results.length) results = categoryModel.getCategoriesFromArticles(results);

        console.log(JSON.stringify(results))

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

        if (results.length) results.forEach((res) => 
            res.categories = pool.query(sqlLib.buildGetCategoriesIdByArticleQuery(res.article_id)))

        return results;
    },

    async searchArticle(words, categories) {
        var results = pool.query(sqlLib.buildSearchArticlesByWordsAndCategoriesQuery(words, categories));

        if (results.length) results.forEach((res) => 
            res.categories = pool.query(sqlLib.buildGetCategoriesIdByArticleQuery(res.article_id)))

        return results;
    },
};
