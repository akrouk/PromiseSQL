const { StatementBuilder } = require('./statement-builder');
const { typeError } = require('../psql-error');
const typedefs = require('../typedefs');

class InsertStatementBuilder extends StatementBuilder {
    /**
     * @param {typedefs.InsertStatementOptions} options 
     */
    constructor(options) {
        super('insert', options);
    }

    get data() {
        // Missing table
        if (!(this.table || this.into)) typeError('table');

        // Missing values
        if (!this.values) typeError('values');

        // INSERT INTO table ... 
        const statement = [ 'INSERT', 'INTO', this.table ?? this.into ];

        // ... (...columns) ...
        if (this.columns) statement.push(`(${this.columns.join(', ')})`);

        // ... VALUES (...values);
        statement.push('VALUES', `(${Array(this.values.length).fill('?').join(', ')})`);

        return { 
            sql: this.build(statement), 
            params: this.values,
            /** @returns {void} */
            parseData: () => void 0
        };
    }

    /**
     * @param {string} into 
     */
    setInto(into) {
        this.into = this.table = into;
    }

    /**
     * @param {string[]} columns 
     */
    setColumns(columns) {
        this.columns = columns;
    }

    /**
     * @param {string[]} values
     */
    setValues(values) {
        this.values = values;
    }
}

module.exports = { InsertStatementBuilder };