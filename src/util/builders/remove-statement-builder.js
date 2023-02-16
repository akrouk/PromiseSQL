const { StatementBuilder } = require('./statement-builder');
const { buildClause } = require('./clause-builder');
const { typeError } = require('../psql-error');
const typedefs = require('../typedefs');

class RemoveStatementBuilder extends StatementBuilder {
    /**
     * @param {typedefs.RemoveStatementOptions} options 
     */
    constructor(options) {
        super('update', options)
    }

    get data() {
        // Missing table
        if (!(this.table || this.from)) typeError('table');

        // DELETE FROM table ... 
        const statement = [ 'DELETE', 'FROM', this.table ?? this.from ];

        // ... WHERE ...conditions;
        const { clause, conditions } = buildClause('WHERE', this.where); 
        statement.push(...clause);

        return { 
            sql: this.build(statement), 
            params: conditions,
            /** @returns {void} */
            parseData: () => void 0
        };
    }

    /**
     * @param {string} from 
     */
    setFrom(from) {
        this.from = from;
    }

    /**
     * @param {(string|typedefs.BooleanExpression)[]} where
     */
    setWhere(where) {
        this.where = where;
    }
}

module.exports = { RemoveStatementBuilder };