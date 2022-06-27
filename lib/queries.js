const { PromiseDB } = require('./promisedb');
const sqlstr = require('../util/sqlstr');
const sp = require('synchronized-promise');

// Current database (undefined if not open)
var db = undefined;

/**
 * Opens a database file.
 * @param {string} filepath Path to the database file
 */
function open(filepath) {
    db = new PromiseDB(filepath);
}

/**
 * Closes an open database.
 */
function close() {
    db.close();
    db = undefined;
}

/**
 * Dynamically opens and closes a database if a filepath is provided.
 * @param {string} filepath 
 * @returns {Promise<Function>}
 */
function dynamicAccess(filepath) {
    // If filepath is undefined or db is already open, do nothing
    if (!filepath || db) {
        return;
    }

    // Open db and then close it when promise is fulfilled 
    return new Promise((resolve, reject) => {
        try {
            open(filepath);
            resolve({
                then: () => close()
            });
        }
        catch(error) {
            reject(error);
        }
    });
}

module.exports = {
    // Export database open/close functions (synchronous!)
    open, close,

    print: function() {
        console.log(typeof db);
    },

    /**
     * Asynchronous database query.
     * @param {string} sql SQL statement
     * @param {string[]} args The arguments of the statement
     * @param {string} filepath Path to the database file
     * @returns {undefined|object}
     */
    query: async function(sql, args = [], filepath = undefined) {
        dynamicAccess(filepath);
        return await db.query(sql, args);
    },

    /**
     * Asynchronous instert query.
     * @param {InsertOptions} options 
     */
     insert: async function(options) {
        dynamicAccess(options.filepath);
        const sql = sqlstr.insertStr(options);
        await db.query(sql, options.values);
    },

    /**
     * Asynchronous selection query.
     * @param {SelectionOptions} options 
     * @returns 
     */
    select: async function(options) {
        dynamicAccess(options.filepath);
        const { sql, args } = sqlstr.selectStr(options);
        return await db.query(sql, args);
    },

    /**
     * Asynchronous update query.
     * @param {UpdateOptions} options 
     */
    update: async function(options) {
        dynamicAccess(options.filepath);
        const { sql, args } = sqlstr.updateStr(options);
        await db.query(sql, args);
    },

    /**
     * Asynchronous delete query.
     * @param {DeleteOptions} options 
     */
    delete: async function(options) {
        dynamicAccess(options.filepath);
        const { sql, args } = sqlstr.deleteStr(options);
        await db.query(sql, args);
    },

    /**
     * Synchronous query 
     * @param {function} query 
     * @param {string[]|BaseOptions} options 
     * @returns {undefined|object}
     */
    sync: function(query, options = []) {
        if (query.constructor.name !== 'AsyncFunction') 
            throw new Error('Function is not asynchronous.');
        
        return sp(query)(options);
    }
}