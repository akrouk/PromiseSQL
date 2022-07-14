module.exports = {
    /**
     * Equals expression (lhs = rhs)
     * @param {string} lhs 
     * @param {string} rhs 
     * @returns {BooleanExpression}
     */
    eq: function(lhs, rhs) {
        return { lhs: lhs, operator: '=', rhs: rhs };
    },

    /**
     * Less than expression (lhs < rhs)
     * @param {string} lhs 
     * @param {string} rhs 
     * @returns {BooleanExpression}
     */
    lt: function(lhs, rhs) {
        return { lhs: lhs, operator: '<', rhs: rhs };
    },

    /**
     * Greater than expression (lhs > rhs)
     * @param {string} lhs 
     * @param {string} rhs 
     * @returns {BooleanExpression}
     */
    gt: function(lhs, rhs) {
        return { lhs: lhs, operator: '>', rhs: rhs };
    },

    /**
     * Less than or equal to expression (lhs <= rhs)
     * @param {string} lhs 
     * @param {string} rhs 
     * @returns {BooleanExpression}
     */
    leq: function(lhs, rhs) {
        return { lhs: lhs, operator: '<=', rhs: rhs };
    },

    /**
     * Greater than or equal to expression (lhs >= rhs)
     * @param {string} lhs 
     * @param {string} rhs 
     * @returns {BooleanExpression}
     */
    geq: function(lhs, rhs) {
        return { lhs: lhs, operator: '>=', rhs: rhs };
    }
}