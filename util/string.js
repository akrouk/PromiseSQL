const { parseColumns, parseValues, parseClause } = require('./helpers');
const { typeError } = require('./psql-error');

const emptyClause = { stmt: '', conditions: new Array() };

module.exports = {
    /**
     * Generates an SQL insert statement string.
     * @param {InsertOptions} options Arguments passed into {@link queries}
     * @returns {string}
     */
    insertStr: function(options) {
        if (!(options.table || options.into)) typeError('table');
        if (!options.values) typeError('values');

        let stmt = `INSERT INTO ${options.table ?? options.into}`;

        if (options.columns)
            stmt += ` (${parseColumns(options.columns)})`;

        stmt += `\nVALUES ${parseValues(options.values)}`;
        return stmt;
    },

    /**
     * Generates an SQL selection statement string.
     * @param {SelectionStatementOptions} options Arguments passed into {@link queries}
     * @returns {Object}
     */
    selectStr: function(options) {
        if (!(options.table || options.from)) typeError('table');
        if (!(options.all || options.columns)) typeError('columns');
        
        let stmt = options.all ? 'SELECT *' : 'SELECT ';
        let whereClause = emptyClause;

        if (options.columns) 
            stmt += parseColumns(options.columns);

        stmt += `\nFROM ${options.table ?? options.from}`;

        if (options.where) 
            whereClause = parseClause('WHERE', options.where);

        stmt += whereClause.stmt;
        return { sql: stmt, args: whereClause.conditions }; 
    },

    /**
     * Generates an SQL update statement string.
     * @param {UpdateOptions} options Arguments passed into {@link queries}
     * @returns {Object}
     */
    updateStr: function(options) {
        if (!options.table) typeError('table');
        if (!options.set) typeError('set values');

        let stmt = `UPDATE ${options.table}`;

        let setClause = parseClause('SET', options.set, ', ');
        let whereClause = emptyClause;

        stmt += setClause.stmt;

        if (options.where)
            whereClause = parseClause('WHERE', options.where);

        stmt += whereClause.stmt;
        const conditions = setClause.conditions.concat(whereClause.conditions);
        return { sql: stmt, args: conditions };
    },

    /**
     * Generates an SQL delete statement string.
     * @param {DeleteOptions} options Arguments passed into {@link queries}
     * @returns {Object}
     */
    deleteStr: function(options) {
        if (!(options.table || options.from)) typeError('table');

        let stmt = `DELETE FROM ${options.table ?? options.from}`;
        let whereClause = emptyClause;

        if (options.where)
            whereClause = parseClause('WHERE', options.where);

        stmt += whereClause.stmt;
        return { sql: stmt, args: whereClause.conditions };
    }
}