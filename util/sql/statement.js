const { PromiseDB } = require("../../lib/promisedb");
const { StatementBuilder } = require("./statement-builder");

class Statement {
    #database;
    #statement;

    /**
     * @param {PromiseDB|null} database
     * @param {StatementType} type  
     * @param {BaseStatementOptions} options 
     */
    constructor(database, type, options) {
        this.#database = database ?? new PromiseDB(options.file);
        this.#statement = { ...new StatementBuilder(type, options).data };
    }

    /**
     * @returns
     */
    async run() {
        const data = await this.#database.run(this.#statement);
        return this.#statement.parseData(data);
    }
}

class SelectStatement extends Statement {
    /**
     * @param {PromiseDB|null} database 
     * @param {SelectStatementOptions} options 
     */
    constructor(database, options) {
        super(database, 'select', options);
    }
}

module.exports = { SelectStatement }