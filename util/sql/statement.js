const { PromiseDB } = require("../../lib/promisedb");
const { selectStr } = require("../string");
const { StatementBuilder } = require("./statement-builder");

class Statement {
    /**
     * @param {PromiseDB|null} database 
     * @param {BaseStatementOptions} options 
     */
    constructor(database, options) {
        this.database = database ?? new PromiseDB(options.file);
        this.options = options;
    }

    /**
     * @param {StatementType} type 
     */
    async run() {
        const { sql, args } = selectStr(this.options);
        const data = await this.database.run(sql, args);
        return (data.length > 0 && this.options.first) ? data[0] : data;
    }
}

module.exports = { Statement }