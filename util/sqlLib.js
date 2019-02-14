module.exports = {
    // CRUD
    getUsersQuery: () => `SELECT * FROM user`,
    getArticlesQuery: () => `SELECT * FROM article`,
    getCategoriesQuery: () => `SELECT * FROM category`,

    getCommentsQueryFromArticle (id) {
        let query = `SELECT comment.*, user.name AS name FROM comment LEFT JOIN user ON comment.user_id = user.user_id WHERE comment.article_id = ${id}`;
        console.log({query});
        return query;
    },
    
    getCommentsQueryFromUser (id) {
        let query = `SELECT comment.*, user.name AS name FROM comment LEFT JOIN user ON comment.user_id = user.user_id WHERE comment.user_id = ${id}`;
        console.log({query});
        return query;
    },

    // insert into TABLE (ELEMENTS, createdAt) values (VALUES, now());
    buildCreateQuery: (obj, table) => {
        var sets = extractSets(obj, false);
        

        var columns = '';
        sets.forEach((set) => columns += set.column + ',');

        var values = '"';
        sets.forEach((set) => values += set.value + '","');
        values = values.slice(0, -1).replace('"true"');

        var query = `INSERT INTO ${table} (${columns} createdAt) VALUES (${values} NOW())`;

        console.log({query});
        return query;
    },

    // select * from TABLE where id = ID;
    buildFindByIdQuery: (obj) => {
        var queryParams = extractObjectInfos(obj);
        var query = `SELECT * FROM ${queryParams.table} WHERE ${queryParams.idSet}`;

        console.log({query});
        return query;
    },

    // update TABLE set ELEMENTS where id = ID;
    buildUpdateQuery: (obj) => {
        obj.createdAt = null;
        var queryParams = extractObjectInfos(obj);
        var sets = extractSets(obj, true);

        var querySet = '';

        // Fill the query SET clause
        sets.forEach((set) => querySet += set.column + ' = "' + set.value + '",');

        querySet += ' createdAt = NOW()'

        var query = `UPDATE ${queryParams.table} SET ${querySet} WHERE ${queryParams.idSet}`
        console.log({query, queryParams});
        return query;
    },

    // delete from TABLE where id = ID;
    buildDeleteQuery(obj) {
        var queryParams = extractObjectInfos(obj);
        var query = `DELETE FROM ${queryParams.table} WHERE ${queryParams.idSet}`;

        console.log({query});
        return query;
    },
    // End of CRUD operations

    // select * from TABLE where CLAUSE
    buildFindByElemQuery(obj, table) {
        var sets = extractSets(obj, false);
        var whereClause = '';

        sets.forEach((set) => whereClause += set.column + ' = "' + set.value + '" AND ');
        whereClause = whereClause.slice(0, -4);
        
        var query = `SELECT * FROM ${table} WHERE ${whereClause}`;

        console.log({query});
        return query;
    },

    // select * from TABLE where MODEL PARAM
    buildFindElemByModelQuery(elemTable, model) {
        var modelParams = extractObjectInfos(model);
        
        var query = `SELECT * FROM ${elemTable} WHERE ${modelParams.idSet}`;

        console.log({query});
        return query;
    },

    buildSearchArticlesByWordsAndCategoriesQuery(words, categories) {
        var categoriesId, categoryQuery = '';
        if (categories) {
            categories.forEach((category) => categoriesId += category.category_id + ', ')
            categoriesId.slice(0, -2);

            categoryQuery = `SELECT article.* FROM article INNER JOIN article_category ON article_category.category_id IN (${categoriesId}) UNION `;
        }

        var query = categoryQuery + `SELECT article.* FROM article WHERE MATCH(title, content) AGAINST('${words}' IN NATURAL LANGUAGE MODE)`;

        console.log({query});
        return query;
    },

    buildSearchUsersQuery(words) {
        var query = `SELECT user.* FROM user WHERE MATCH(email, name, surname) AGAINST('${words}' IN NATURAL LANGUAGE MODE)`;

        console.log({query});
        return query;
    }
};

const OBJ_ID_REGEX = /([a-z]*)(_id)/;

/*
 * Extract the table's name, row id in a string format
 */
var extractObjectInfos = (obj) => {
    var queryParams = {
        // Table
        table: '', 
        id: '',
        // x_id
        idSet: ''
    }

    queryParams.idSet = Object.keys(obj).filter((key) => key.match(OBJ_ID_REGEX))[0];
    queryParams.id = obj[queryParams.idSet];
    queryParams.table = queryParams.idSet.slice(0, -3);
    queryParams.idSet = queryParams.idSet + ' = ' + queryParams.id;

    return queryParams;
}

/*
 * Extract the update parameters for the SET clause of the query
 */
var extractSets = (obj, removeIdFields) => {
    var set = [];

    var keys = Object.keys(obj);

    if (removeIdFields) keys = keys.filter((key) => !key.match(OBJ_ID_REGEX));

    keys.forEach((key) => {
        if (obj[key] || typeof(obj[key]) === 'boolean') {
            if (typeof(obj[key]) === 'boolean') obj[key] = obj[key] ? 1 : 0;

            set.push({
                column: key,
                value: obj[key]
            });
        }
    }, set)

    return set;
}