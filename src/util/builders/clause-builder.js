const types = require('../typedefs');

/**
 * @param {types.ClauseType} type 
 * @param {(string|types.BooleanExpression)[]|undefined} expressions
 */
function buildClause(type, expressions) {
    if (!expressions) return { clause: [], conditions: [] };

    let clause = [ /** @type {string} */ (type) ], conditions = [];

    for (const expression of expressions) {
        if (typeof expression !== 'string') {
            clause.push(expression.lhs, expression.operator, '?');
            conditions.push(expression.rhs);
        } else {
            clause.push(expression);
        }
    } 

    return { clause, conditions };
}

module.exports = { buildClause }