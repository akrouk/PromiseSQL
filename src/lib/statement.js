const { StatementBuilder } = require("../util/builders/statement-builder");
const typedefs = require('../util/typedefs');

class Statement {
    /**
     * @param {typedefs.StatementType} type
     * @param {typedefs.BaseStatementOptions} options 
     */
    constructor(type, options) {
        Object.assign(this, { ...options });
        this.statement = new StatementBuilder(type, options);
    }
}

class InsertStatement extends Statement {
    /**
     * @param {typedefs.SelectStatementOptions} options 
     */
    constructor(options) {
        super('insert', options);
    }
}

class SelectStatement extends Statement {
    /**
     * @param {typedefs.SelectStatementOptions} options 
     */
    constructor(options) {
        super('select', options);
    }
}

class UpdateStatement extends Statement {
    /**
     * @param {typedefs.SelectStatementOptions} options 
     */
    constructor(options) {
        super('update', options);
    }
}

class RemoveStatement extends Statement {
    /**
     * @param {typedefs.SelectStatementOptions} options 
     */
    constructor(options) {
        super('remove', options);
    }
}

module.exports = { InsertStatement, SelectStatement, UpdateStatement, RemoveStatement }