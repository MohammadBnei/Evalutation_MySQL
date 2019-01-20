const pool = require('../config/database');
const sqlLib = require('../util/sqlLib');

module.exports = {
    // CRUD
    async createCategory(category) {
        var query = await pool.query(sqlLib.buildCreateQuery(category, 'category'));
        var result = pool.query(sqlLib.buildFindByIdQuery({category_id: query.insertId}));

        return result;
        
    },

    async getCategoryById(id) {
        var result = pool.query(sqlLib.buildFindByIdQuery({category_id: id}));

        return result;        
    },

    async getCategories() {
        var results = pool.query(sqlLib.getCategoriesQuery());

        return results;
    },

    async updateCategory(category) {
        await pool.query(sqlLib.buildUpdateQuery(category));
        var result = pool.query(sqlLib.buildFindByIdQuery(category));

        return result;
        
    },

    async deleteCategory(id) {
        await pool.query(sqlLib.buildDeleteQuery({category_id: id}));
        if (result.affectedRows === 0) throw new Error('Wrong category id');
    },
    // End of CRUD Operations
}