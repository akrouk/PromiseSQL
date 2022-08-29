/**
 * 
 * @param {Object} data 
 */
 function simplifyObject(datum) {
    for (const key of Object.keys(datum)) {
        if (!key.includes('(') || !key.includes(')')) continue;
        const newKey = key.substring(0, key.indexOf('(')).toLowerCase();
        Object.assign(datum, { [newKey]: datum[key] });
        delete datum[key];
    }
}

/**
 * 
 * @param {Object[]} data 
 */
function simplifyArray(data) {
    if (!data) return;
    data.forEach(datum => simplifyObject(datum));
}

module.exports = {
    simplifyArray, simplifyObject,

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
    parseClause: function(type, expressions, delimiter = ' ') {
        let stmt = '\n' + type + ' ', conditions = [];

        expressions.forEach(expression => {
            if (expression.constructor.name === 'Object') {
                stmt += expression.lhs + ' ' + expression.operator + ' ?' + delimiter;
                conditions.push(expression.rhs);
            }
            else {
                stmt += expression + delimiter;
            }
        });

        stmt = stmt.slice(0, stmt.length - delimiter.length);
        return { stmt, conditions };
    },

    /**
     * Check whether a database is open.
     * @param {object|undefined} db 
     */
    isOpen: function(db) {
        if (!db) {
            throw new Error('Database is not open.');
        }
    }
}