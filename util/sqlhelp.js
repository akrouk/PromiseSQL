module.exports = {
    /**
     * Parses the columns of an SQL statement.
     * @param {string[]} columns 
     * @returns 
     */
    parseColumns: function(columns) {
        stmt = '';

        columns.forEach(column => {
            stmt += column + ', ';
        });

        return stmt.slice(0, stmt.length - 2);
    },

    /**
     * Parses the values of an SQL statement.
     * @param {string[]} values 
     * @returns 
     */
    parseValues: function(values) {
        stmt = '(';

        for (i = 0; i < values.length; i++)
            stmt += '?, ';

        stmt = stmt.slice(0, stmt.length - 2);
        return stmt + ')'; 
    },

    /**
     * Parses the clause of an SQL statement (WHERE, SET, etc.).
     * @param {string} type 
     * @param {(string|Expression)[]} expressions 
     */
    parseClause: function(type, expressions) {
        let stmt = '\n' + type + ' ', conditions = [];

        expressions.forEach(expression => {
            if (expression.constructor.name === 'Object') {
                stmt += expression.lhs + ' ' + expression.operator + ' ? ';
                conditions.push(expression.rhs);
            }
            else {
                stmt += expression + ' ';
            }
        });

        stmt = stmt.slice(0, stmt.length - 1);
        return { stmt, conditions };
    },

    /**
     * Check whether the database is open
     * @param {PromiseDB|undefined} db 
     */
    isOpen: function(db) {
        if (!db) throw 'Database is not open.';
    }
}