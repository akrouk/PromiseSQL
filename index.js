const { PromiseDB } = require('./lib/promisedb');

// Export query functions and PromiseDB class
module.exports = require('./lib/queries');
module.exports.PromiseDB = PromiseDB;

// Export conditions (expressions, logic operators, etc.)
module.exports.expression = {
    ...require('./util/expressions/boolean'),
    ...require('./util/expressions/numeric')
};

module.exports.operator = require('./util/operators/logic');