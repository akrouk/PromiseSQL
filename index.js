const { PromiseDB } = require('./lib/promisedb');

// Export query functions and PromiseDB class
module.exports = require('./lib/queries');
module.exports.PromiseDB = PromiseDB;

// Export conditions (expressions, operators, etc.)
module.exports.expression = {
    ...require('./lib/expressions/boolean'),
    ...require('./lib/expressions/numeric')
};

module.exports.operator = require('./lib/operators/logic');