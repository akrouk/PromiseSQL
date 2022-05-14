const { PromiseDB } = require('./lib/promisedb');

// Export query functions and PromiseDB class
module.exports = require('./lib/queries');
module.exports.PromiseDB = PromiseDB;

// Conditional operators for query arguments
module.exports.Operators = {
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT'
}