const pool = require('../config/database');
const sqlLib = require('../util/sqlLib');

module.exports = {
    // CRUD
    async createComment(comment) {
        var query = await pool.query(sqlLib.buildCreateQuery(comment, 'comment', [{column: 'user_id', value: comment.user_id}, {column: 'artice_id', value: comment.article_id}]));
        var result = pool.query(sqlLib.buildFindByIdQuery({comment_id: query.insertId}));

        return result;
        
    },

    getCommentById(id) {
        var result = pool.query(sqlLib.buildFindByIdQuery({comment_id: id}));

        return result;        
    },

    getComments() {
        var results = pool.query(sqlLib.getCommentsQuery());

        return results;
    },

    async updateComment(comment) {
        await pool.query(sqlLib.buildUpdateQuery(comment));
        var result = pool.query(sqlLib.buildFindByIdQuery(comment));

        return result;
        
    },

    deleteComment(id) {
        var result = pool.query(sqlLib.buildDeleteQuery({comment_id: id}));
        if (result.affectedRows === 0) throw new Error('Wrong comment id');
    },
    // End of CRUD Operations

    getCommentsByUser(user_id) {
        var results = pool.query(sqlLib.getCommentsQueryFromUser(user_id));

        return results;
    },

    getCommentsByArticle(article_id) {
        var results = pool.query(sqlLib.getCommentsQueryFromArticle(article_id));

        return results;
    }
};
