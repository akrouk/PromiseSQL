const { parseColumns, parseValues, parseClause } = require('./sqlhelp');

module.exports = {
    /**
     * Generates a string of an SQL selection statement.
     * @param {SelectionArguments} options Arguments passed into {@link queries}
     */
    select: function(options) {
        if (!options.all && !options.columns)
            throw 'No columns specified.';
        
        let stmt = options.all ? 'SELECT *\n' : 'SELECT ';
        let whereClause = { stmt: '', conditions: [] };

        if (options.columns) 
            stmt += parseColumns(options.columns);

        stmt += 'FROM ' + options.from;

        if (options.where) 
            whereClause = parseClause('WHERE', options.where);

        stmt += whereClause.stmt;
        return { sql: stmt, args: whereClause.conditions }; 
    }
}