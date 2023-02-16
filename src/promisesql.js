const { PromiseDB } = require('./lib/promisedb');
const { InsertStatement, SelectStatement, UpdateStatement, RemoveStatement } = require('./lib/statement');
const typedefs = require('./util/typedefs');

/** @type {PromiseDB|null} */
var database = null;

/**
 * @param {typedefs.RemoveStatementOptions} options 
 * @returns 
 */
const removeStatment = async options => await new RemoveStatement(database, options).run();

module.exports = {
    // PromiseDB class
    ...require('./lib/promisedb'),

    // Database functions

    /**
     * Open a database file.
     * @param {string|typedefs.DatabaseOptions} options
     * @returns 
     */
    open: options => database = new PromiseDB(options),

    /**
     * Close the database.
     */
    close: () => {
        database.close();
        database = null;
    },

    // Query functions

    /**
     * @param {typedefs.InsertStatementOptions} options 
     * @returns 
     */
    insert: async options => await new InsertStatement(database, options).run(),

    /**
     * @param {typedefs.SelectStatementOptions} options 
     * @returns 
     */
    select: async options => await new SelectStatement(database, options).run(), 

    /**
     * @param {typedefs.UpdateStatementOptions} options 
     * @returns 
     */
    update: async options => await new UpdateStatement(database, options).run(),

    remove: removeStatment,
    delete: removeStatment,

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