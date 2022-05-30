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

        values.forEach(value => {
            stmt += value + ', ';
        });

        stmt = stmt.slice(0, stmt.length - 2);
        return stmt + ')'; 
    },

    /**
     * Parses the clause of an SQL statement (WHERE, SET, etc.).
     * @param {string} type 
     * @param {(string|Expression)[]} expressions 
     */
    parseClause(type, expressions) {
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
    }
}