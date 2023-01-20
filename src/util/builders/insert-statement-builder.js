const { StatementBuilder } = require('./statement-builder');
const typedefs = require('../typedefs');

class InsertStatementBuilder extends StatementBuilder {
    /**
     * @param {typedefs.InsertStatementOptions} options 
     */
    constructor(options) {
        super('insert', options)
        Object.assign(this, { ...options });
    }

    /**
     * @param {string} into 
     */
    setInto(into) {
        this.into = this.table = into;
    }
}

module.exports = { InsertStatementBuilder };