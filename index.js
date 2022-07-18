module.exports = {
    // PromiseDB class
    PromiseDB: require('./lib/promisedb').PromiseDB, 

    // Query functions
    ...require('./lib/queries'),

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
    PSQLError: require('./util/psql-error').PSQLError
}