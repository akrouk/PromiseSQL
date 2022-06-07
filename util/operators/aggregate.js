module.exports = {
    /**
     * Max function [MAX(column_name)]
     * @param {string} column 
     * @returns 
     */
    max: function(column) {
        return `MAX(${column})`;
    },

    min: function(column) {
        return `MIN(${column})`;
    },

    count: function(column) {
        return `COUNT(${column})`;
    },

    avg: function(column) {
        return `AVG(${column})`;
    },

    sum: function(column) {
        return `SUM(${column})`;
    }
}