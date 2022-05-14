const { PromiseDB } = require('./promisedb');
const { isOpen, validate } = require('../util/helpers');
const sqlstr = require('../util/sqlstr');
const sp = require('synchronized-promise');
var db = undefined;

module.exports = {
    /**
     * Opens a database file.
     * @param {string} filepath Path to the database file
     */
    open: function(filepath) {
        db = new PromiseDB(filepath);
    },

    /**
     * Closes an open database.
     */
    close: function () {
        db.close();
        db = undefined;
    },

    /**
     * Asynchronous database query.
     * @param {string} sql SQL statement
     * @param {Array<string>} args The arguments of the statement
     * @returns {Promise<any>}
     */
    query: async function(sql, args = []) {
        isOpen(db);
        return await db.query(sql, args);
    },

    /**
     * Asynchronous selection statement.
     * @param {SelectionArguments} args 
     * @returns 
     */
    select: async function(options) {
        options.filepath ? this.open(options.filepath) : isOpen(db);
        const { sql, args } = sqlstr.select(options);
        const data = await db.query(sql, args);
        return options.filepath ? (this.close(), data) : data;
    },

    /**
     * Synchronous query 
     * @param {function} query 
     * @param {Array<string>|BaseArguments} options 
     * @returns {any}
     */
    sync: function(query, options = []) {
        if (query.constructor.name !== 'AsyncFunction') 
            throw 'Function is not asynchronous.';
        
        return sp(query)(options);
    }
}