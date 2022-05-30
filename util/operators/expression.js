module.exports = {
    /**
     * Equals expression (lhs = rhs)
     * @param {string} lhs 
     * @param {string} rhs 
     * @returns 
     */
    eq: function(lhs, rhs) {
        return { lhs: lhs, operator: '=', rhs: rhs };
    },

    /**
     * Less than expression (lhs < rhs)
     * @param {string} lhs 
     * @param {string} rhs 
     * @returns 
     */
    lt: function(lhs, rhs) {
        return { lhs: lhs, operator: '<', rhs: rhs };
    },

    /**
     * Greater than expression (lhs > rhs)
     * @param {string} lhs 
     * @param {string} rhs 
     * @returns 
     */
    gt: function(lhs, rhs) {
        return { lhs: lhs, operator: '>', rhs: rhs };
    },

    /**
     * Less than or equal to expression (lhs <= rhs)
     * @param {string} lhs 
     * @param {string} rhs 
     * @returns 
     */
    leq: function(lhs, rhs) {
        return { lhs: lhs, operator: '<=', rhs: rhs };
    },

    /**
     * Greater than or equal to expression (lhs >= rhs)
     * @param {string} lhs 
     * @param {string} rhs 
     * @returns 
     */
    geq: function(lhs, rhs) {
        return { lhs: lhs, operator: '>=', rhs: rhs };
    }
}