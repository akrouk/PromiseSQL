const { parseColumns, parseValues, parseClause } = require('./sqlhelp');
const EMPTY_CLAUSE = { stmt: '', conditions: [] };

module.exports = {
    /**
     * Generates an SQL insert statement string.
     * @param {InsertOptions} options Arguments passed into {@link queries}
     * @returns {string}
     */
     insertStr: function(options) {
        if (!options.table || !options.values)
            throw new Error('No table or values specified.');

        let stmt = `INSERT INTO ${options.table}`;

        if (options.columns)
            stmt += ` (${parseColumns(options.columns)})`;

        stmt += `\nVALUES ${parseValues(options.values)}`;
        return stmt;
    },

    /**
     * Generates an SQL selection statement string.
     * @param {SelectionOptions} options Arguments passed into {@link queries}
     * @returns {string}
     */
    selectStr: function(options) {
        if (!options.all && !options.columns)
            throw new Error('No columns specified.');
        
        let stmt = options.all ? 'SELECT *\n' : 'SELECT ';
        let whereClause = EMPTY_CLAUSE;

        if (options.columns) 
            stmt += parseColumns(options.columns);

        stmt += `\nFROM ${options.from}`;

        if (options.where) 
            whereClause = parseClause('WHERE', options.where);

        stmt += whereClause.stmt;
        return { sql: stmt, args: whereClause.conditions }; 
    },

    /**
     * Generates an SQL update statement string.
     * @param {UpdateOptions} options Arguments passed into {@link queries}
     * @returns {string}
     */
    updateStr: function(options) {
        if (!options.table || !options.set)
            throw new Error('No table or columns specified.');

        let stmt = `UPDATE ${options.table}`;

        let setClause = parseClause('SET', options.set);
        let whereClause = EMPTY_CLAUSE;

        stmt += setClause.stmt;

        if (options.where)
            whereClause = parseClause('WHERE', options.where);

        stmt += whereClause.stmt;
        let conditions = setClause.conditions.concat(whereClause.conditions);
        return { sql: stmt, args: conditions };
    },

    /**
     * Generates an SQL delete statement string.
     * @param {DeleteOptions} options Arguments passed into {@link queries}
     * @returns {string}
     */
    deleteStr: function(options) {
        if (!options.table)
            throw new Error('No table specified.');

        let stmt = `DELETE FROM ${options.table}`;
        let whereClause = EMPTY_CLAUSE;

        if (options.where)
            whereClause = parseClause('WHERE', options.where);

        stmt += whereClause.stmt;
        return { sql: stmt, args: whereClause.conditions };
    }
}