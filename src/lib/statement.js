const { PromiseDB } = require("./promisedb");
const { StatementBuilder } = require("../util/builders/statement-builder");
const typedefs = require('../util/typedefs');

class Statement {
    /**
     * @param {PromiseDB|null} database
     * @param {typedefs.StatementType} type  
     * @param {typedefs.BaseStatementOptions} options 
     */
    constructor(database, type, options) {
        this.database = database ?? new PromiseDB(options.file);
        this.statement = new StatementBuilder(type, options);
    }

    /**
     * @returns
     */
    async run() {
        const data = await this.database.query(this.statement);
        return this.statement.parseData(data);
    }
}

class SelectStatement extends Statement {
    /**
     * @param {PromiseDB|null} database 
     * @param {typedefs.SelectStatementOptions} options 
     */
    constructor(database, options) {
        super(database, 'select', options);
    }
}

module.exports = { SelectStatement }