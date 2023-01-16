const { typeError } = require('../psql-error');

class StatementBuilder {
    #build = {
        select: () => this.#buildSelectStatement()
    };

    #type;
    #options;

    /**
     * @param {StatementType} type
     * @param {BaseStatementOptions} options 
     */
    constructor(type, options) {
        this.#type = type;
        this.#options = options;
    }

    /**
     * @returns {StatementObject}
     */
    get data() {
        return this.#build[this.#type]();
    }

    #buildSelectStatement() {
        const options = (/** @type {SelectStatementOptions} */ (this.#options));

        // Missing table or from
        if (!(options.table || options.from)) typeError('table');

        // Missing columns or all
        if (!(options.all || options.columns)) typeError('columns');
        
        // SELECT ...
        const statement = [ 'SELECT' ];

        // ... * | columns ...
        options.all ? statement.push('*') : statement.push(options.columns.join(', '))

        // ... FROM table ... 
        statement.push('FROM', options.table ?? options.from);

        // ... WHERE conditions;
        const { clause, conditions } = this.#buildClause('WHERE', options.where);
        statement.push(...clause);

        return { 
            sql: this.#punctuate(statement), 
            params: conditions,
            /** @param {any[]} data */
            parseData: data => (data.length > 0 && options.first) ? data[0] : data
        };
    }

    /**
     * @param {ClauseType} type 
     * @param {(string|BooleanExpression)[]|undefined} expressions
     */
    #buildClause(type, expressions) {
        if (!expressions) return { clause: [], conditions: [] };

        let clause = [ /** @type {string} */ (type) ], conditions = [];

        for (const expression of expressions) {
            if (typeof expression !== 'string') {
                clause.push(expression.lhs, expression.operator, '?');
                conditions.push(expression.rhs);
            } else {
                clause.push(expression);
            }
        } 

        return { clause, conditions };
    }

    /**
     * @param {string[]} statement 
     * @returns 
     */
    #punctuate(statement) {
        return statement.join(' ') + ';';
    }
}

module.exports = { StatementBuilder }