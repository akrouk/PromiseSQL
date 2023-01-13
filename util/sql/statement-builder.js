const { parseColumns, parseClause } = require("../helpers");
const { typeError } = require("../psql-error");

class StatementBuilder {
    #statements = {
        select: () => this.#parseSelect()
    };

    /**
     * @param {StatementType} type
     * @param {BaseStatementOptions} options 
     */
    constructor(type, options) {
        this.type = type;
        this.options = options;
        return this.#statements[this.type]();
    }

    #parseSelect() {
        const options = (/** @type {SelectionStatementOptions} */ (this.options));

        if (!(options.table || options.from)) typeError('table');
        if (!(options.all || options.columns)) typeError('columns');
        
        const stmt = options.all ? [ 'SELECT *' ] : [ 'SELECT' ];
        let whereClause = { stmt: '', conditions: new Array() };

        if (options.columns) 
            stmt += parseColumns(options.columns);

        stmt += `\nFROM ${options.table ?? options.from}`;

        if (options.where) 
            whereClause = parseClause('WHERE', options.where);

        stmt += whereClause.stmt;

        return { 
            sql: stmt, 
            params: whereClause.conditions,
            parseData: data => (data.length > 0 && options.first) ? data[0] : data
        };
    }
}

module.exports = { StatementBuilder }