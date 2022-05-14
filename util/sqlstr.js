module.exports = {
    /**
     * Generates a string of an SQL selection statement.
     * @param {SelectionArguments} options Arguments passed into {@link queries}
     */
    select: function(options) {
        if (!options.all && !options.columns)
            throw 'No columns specified.';
        
        console.log(options.all);
        let stmt = options.all ? 'SELECT * ' : 'SELECT ';
        let conditions = options.where ?? [];

        if (options.columns) {
            options.columns.forEach(column => {
                stmt += column + ', ';
            });

            stmt = stmt.slice(0, stmt.length - 2);
        }

        stmt += ' FROM ' + options.from;
        return { sql: stmt, args: conditions }; 
    }
}