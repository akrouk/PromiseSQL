const { PromiseDB } = require('./lib/promisedb');

// Export query functions and PromiseDB class
module.exports = require('./lib/queries');
module.exports.PromiseDB = PromiseDB;

// Operators
module.exports.expression = require('./util/operators/expression');
module.exports.logic = require('./util/operators/logic');