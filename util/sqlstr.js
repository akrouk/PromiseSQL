const { parseColumns, parseValues, parseClause } = require('./sqlhelp');

module.exports = {
    /**
     * Generates a string of an SQL selection statement.
     * @param {SelectionOptions} options Arguments passed into {@link queries}
     * @returns
     */
    select: function(options) {
        if (!options.all && !options.columns)
            throw 'No columns specified.';
        
        let stmt = options.all ? 'SELECT *\n' : 'SELECT ';
        let whereClause = { stmt: '', conditions: [] };

        if (options.columns) 
            stmt += parseColumns(options.columns);

        stmt += '\nFROM ' + options.from;

        if (options.where) 
            whereClause = parseClause('WHERE', options.where);

        stmt += whereClause.stmt;
        return { sql: stmt, args: whereClause.conditions }; 
    },

    /**
     * Generates a string of an SQL insert statement.
     * @param {InsertOptions} options 
     * @returns
     */
    insert: function(options) {
        if (!options.table || !options.values)
            throw 'No table or values specified.';

        let stmt = 'INSERT INTO ' + options.table;

        if (options.columns)
            stmt += ' (' + parseColumns(options.columns) + ')';

        stmt += '\nVALUES ' + parseValues(options.values);
        return stmt;
    }
}