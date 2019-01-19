module.exports = {
    // CRUD
    getUsersQuery: () => `SELECT * FROM user`,
    getArticlesQuery: () => `SELECT * FROM article`,
    getCategoriesQuery: () => `SELECT * FROM category`,
    getCommentsQuery: () => `SELECT * FROM comment`,

    buildCreateQuery: (obj, table) => {
        var sets = extractSets(obj);

        var columns = '';
        sets.forEach((set) => columns += set.column + ',');

        var values = '"';
        sets.forEach((set) => values += set.value + '","');
        values = values.slice(0, -1).replace('"true"');

        var query = `INSERT INTO ${table} (${columns} createdAt) VALUES (${values} NOW())`;

        console.log({query});
        return query;
    },

    buildFindByIdQuery: (obj) => {
        var queryParams = extractObjectInfos(obj);
        var query = `SELECT * FROM ${queryParams.table} WHERE ${queryParams.idSet}`;

        console.log({query});
        return query;
    },

    buildUpdateQuery: (obj) => {
        var queryParams = extractObjectInfos(obj);
        var sets = extractSets(obj);

        var querySet = '';

        // Fill the query SET clause
        sets.forEach((set) => querySet += set.column + ' = "' + set.value + '",');

        // Removing the last ','
        querySet = querySet.slice(0,-1);

        var query = `UPDATE ${queryParams.table} SET ${querySet} WHERE ${queryParams.idSet}`
        console.log({query, queryParams});
        return query;
    },

    buildDeleteQuery(obj) {
        var queryParams = extractObjectInfos(obj);
        var query = `DELETE FROM ${queryParams.table} WHERE ${queryParams.idSet}`;

        console.log({query});
        return query;
    },
    // End of CRUD operations

    buildFindByElemQuery(obj, table) {
        var sets = extractSets(obj);
        var whereClause = '';

        sets.forEach((set) => whereClause += set.column + ' = "' + set.value + '" AND ');
        whereClause = whereClause.slice(0, -4);
        
        var query = `SELECT * FROM ${table} WHERE ${whereClause}`;

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
    console.log({obj})
    queryParams.idSet = Object.keys(obj).filter((key) => key.match(OBJ_ID_REGEX))[0];
    queryParams.id = obj[queryParams.idSet];
    queryParams.table = queryParams.idSet.slice(0, -3);
    queryParams.idSet = queryParams.idSet + ' = ' + queryParams.id;

    return queryParams;
}

/*
 * Extract the update parameters for the SET clause of the query
 */
var extractSets = (obj) => {
    var set = [];

    Object.keys(obj).forEach((key) => {
        if (obj[key] != undefined && !key.match(OBJ_ID_REGEX)) {
            if (typeof(obj[key]) === 'boolean') obj[key] = obj[key] ? 1 : 0;
            set.push({
                column: key,
                value: obj[key]
            });
        }
    }, set)

    return set;
}