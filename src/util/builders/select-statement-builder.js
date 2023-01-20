const { StatementBuilder } = require('./statement-builder');
const { buildClause } = require('./clause-builder');
const { typeError } = require('../psql-error');
const typedefs = require('../typedefs');

class SelectStatementBuilder extends StatementBuilder {
    /**
     * @param {typedefs.SelectStatementOptions} options 
     */
    constructor(options) {
        super('select', options)
        Object.assign(this, { ...options });
    }

    get data() {
        // Missing table or from
        if (!(this.table || this.from)) typeError('table');

        // Missing columns or all
        if (!(this.all || this.columns)) typeError('columns');
        
        // SELECT ...
        const statement = [ 'SELECT' ];

        // ... * | columns ...
        this.all ? statement.push('*') : statement.push(this.columns.join(', '))

        // ... FROM table ... 
        statement.push('FROM', this.table ?? this.from);

        // ... WHERE conditions;
        const { clause, conditions } = buildClause('WHERE', this.where); 
        statement.push(...clause);

        return { 
            sql: this.build(statement), 
            params: conditions,
            /** @param {any[]} data */
            parseData: data => (data.length > 0 && options.first) ? data[0] : data
        };
    }

    /**
     * @param {boolean} first 
     */
    setFirst(first) {
        this.first = first;
        return this;
    }

    /**
     * @param {boolean} all 
     */
    setAll(all) {
        this.all = all;
        return this;
    }

    /**
     * @param {string[]} columns 
     */
    setColumns(columns) {
        this.columns = columns;
        return this;
    }
    
    /**
     * @param {string} from 
     */
    setFrom(from) {
        this.from = this.table = from;
        return this;
    }

    /**
     * @param {(string|typedefs.BooleanExpression)[]} where 
     */
    setWhere(where) {
        this.where = where;
        return this;
    }
} 

module.exports = { SelectStatementBuilder };