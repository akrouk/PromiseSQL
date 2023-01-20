const { PromiseDB } = require('./lib/promisedb');
const { SelectStatement } = require('./lib/statement');
const { StatementBuilder } = require('./util/builders/statement-builder');

/** @type {PromiseDB|null} */
var database = null;

module.exports = {
    // PromiseDB class
    ...require('./lib/promisedb'), 

    // Query functions
    //...require('./lib/queries'),

    /**
     * @param {SelectStatementOptions} options 
     * @returns 
     */
    select: async options => await new SelectStatement(database, options).run(), 


    // Increment and decrement
    increment: column => `${column} = ${column} + 1`,
    decrement: column => `${column} = ${column} - 1`,

    // Expression functions
    expression: {
        ...require('./lib/expressions/boolean'),
        ...require('./lib/expressions/numeric')
    },

    // Operator variables
    operator: require('./lib/operators/logic'),

    // PSQLError class (for error checking)
    // PSQLError: require('./util/psql-error').PSQLError
}