const { PromiseDB } = require('./promisedb');
const sqlstr = require('../util/sqlstr');
const sp = require('synchronized-promise');

// Current database (undefined if not open)
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
     * @param {string[]} args The arguments of the statement
     * @returns
     */
    query: async function(sql, args = []) {
        isOpen(db);
        return await db.query(sql, args);
    },

    /**
     * Asynchronous selection statement.
     * @param {SelectionOptions} options 
     * @returns 
     */
    select: async function(options) {
        options.filepath ? this.open(options.filepath) : isOpen(db);
        const { sql, args } = sqlstr.select(options);
        const data = await db.query(sql, args);
        return options.filepath ? (this.close(), data) : data;
    },

    /**
     * Asynchronous instert into statement.
     * @param {InsertOptions} options 
     * @returns
     */
    insert: async function(options) {
        options.filepath ? this.open(options.filepath) : isOpen(db);
    },

    /**
     * Synchronous query 
     * @param {function} query 
     * @param {string[]|BaseOptions} options 
     * @returns {any}
     */
    sync: function(query, options = []) {
        if (query.constructor.name !== 'AsyncFunction') 
            throw 'Function is not asynchronous.';
        
        return sp(query)(options);
    }
}

/**
 * Check whether the database is open
 * @param {PromiseDB|undefined} db 
 */
function isOpen(db) {
    if (!db) throw 'Database is not open.';
}