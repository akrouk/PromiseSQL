module.exports = {
    /**
     * Returns a max expression [MAX(column_name)]
     * @param {string} column 
     * @returns {string}
     */
    max: function(column) {
        return `MAX(${column})`;
    },

    /**
     * Returns a min expression [MIN(column_name)]
     * @param {string} column 
     * @returns {string}
     */
    min: function(column) {
        return `MIN(${column})`;
    },

    /**
     * Returns a count expression [COUNT(column_name)]
     * @param {string} column 
     * @returns {string}
     */
    count: function(column) {
        return `COUNT(${column})`;
    },

    /**
     * Returns an average expression [AVG(column_name)]
     * @param {string} column 
     * @returns {string}
     */
    avg: function(column) {
        return `AVG(${column})`;
    },

    /**
     * Returns a sum expression [SUM(column_name)]
     * @param {string} column 
     * @returns {string}
     */
    sum: function(column) {
        return `SUM(${column})`;
    }
}