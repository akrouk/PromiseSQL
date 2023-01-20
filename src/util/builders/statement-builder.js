const typedefs = require('../typedefs');

/**
 * @typedef {import('./insert-statement-builder').InsertStatementBuilder} InsertStatementBuilder
 * @typedef {import('./select-statement-builder').SelectStatementBuilder} SelectStatementBuilder
 * @typedef {InsertStatementBuilder|SelectStatementBuilder} Builders
 */

class StatementBuilder {
    /**
     * @param {typedefs.StatementType} type
     * @param {typedefs.BaseStatementOptions} options 
     */
    constructor(type = undefined, options = undefined) {
        this.type = type;
        this.options = options;
    }

    /**
     * @returns {Builders}
     */
    get builder() {
        return require(`./${this.type}-statement-builder`);
    }

    /**
     * @returns {typedefs.StatementObject}
     */
    get data() {
        return new this.builder(this.options).data;
    }

    get sql() {
        return this.data.sql;
    }

    get params() {
        return this.data.params;
    }

    get parseData() {
        return this.data.parseData;
    }

    /**
     * @param {typedefs.StatementType} type 
     * @returns {Builders}
     */
    setType(type) {
        this.type = type;
        return new this.builder(this.options);
    }

    /**
     * @param {typedefs.BaseStatementOptions} options 
     */
    setOptions(options) {
        this.options = options;
        return this;
    }

    /**
     * @protected
     * @param {string[]} statement 
     * @returns 
     */
    build(statement) {
        return statement.join(' ') + ';';
    }
}

module.exports = { StatementBuilder };