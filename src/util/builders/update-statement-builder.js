const { StatementBuilder } = require('./statement-builder');
const { buildClause } = require('./clause-builder');
const { typeError } = require('../psql-error');
const typedefs = require('../typedefs');

class UpdateStatementBuilder extends StatementBuilder {
    /**
     * @param {typedefs.UpdateStatementOptions} options 
     */
    constructor(options) {
        super('update', options);
    }

    get data() {
        // Missing table
        if (!this.table) typeError('table');

        // Missing 
        if (!this.set) typeError('set values');

        // UPDATE table ... 
        const statement = [ 'UPDATE', this.table ];

        // ... SET ...set values ...
        const { clause: setClause, conditions: setConditions } = buildClause('SET', this.set);
        statement.push(...setClause);

        // ... WHERE ...conditions;
        const { clause: whereClause, conditions: whereConditions } = buildClause('WHERE', this.where); 
        statement.push(...whereClause);

        return { 
            sql: this.build(statement), 
            params: setConditions.concat(whereConditions),
            /** @returns {void} */
            parseData: () => void 0
        };
    }

    /**
     * @param {string} table 
     */
    setTable(table) {
        this.table = table;
    }

    /**
     * @param {(string|typedefs.BooleanExpression)[]} set 
     */
    setSet(set) {
        this.set = set;
    }

    /**
     * @param {(string|typedefs.BooleanExpression)[]} where
     */
    setWhere(where) {
        this.where = where;
    }
}

module.exports = { UpdateStatementBuilder };