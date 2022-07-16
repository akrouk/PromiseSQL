const { PromiseDB } = require('./promisedb');
const sqlstr = require('../util/sqlstr');
const sp = require('synchronized-promise');

// Current database (undefined if not open)
var db = undefined;

/**
 * Opens a database file.
 * @param {string} file Path to the database file
 */
function open(file) {
    db = new PromiseDB(file);
}

/**
 * Closes an open database.
 */
function close() {
    db.close();
    db = undefined;
}

/**
 * Dynamically opens and closes a database if a file is provided.
 * @param {string} file 
 * @returns {void|Promise<Function>}
 */
function dynamicAccess(file) {
    // If file is undefined or db is already open, do nothing
    if (!file || db instanceof PromiseDB) {
        return;
    }

    // Open db and then close it when promise is fulfilled 
    return new Promise((resolve, reject) => {
        try {
            open(file);
            resolve({ then: close });
        } catch(error) {
            reject(error);
        }
    });
}

module.exports = {
    // Export database open/close functions (synchronous!)
    open, close,

    /**
     * Retrieves the database, if open.
     * @returns {PromiseDB}
     */
    getDatabase: function() {
        if (db instanceof PromiseDB) return db;
        throw new Error('Database is not open.');
    },

    /**
     * Asynchronous database query.
     * @param {RunOptions} options SQL statement
     * @returns {QueryPromise}
     */
    run: async function(options) {
        dynamicAccess(options.file);
        return await db.query(options.statement, options.args);
    },

    /**
     * Asynchronous instert query.
     * @param {InsertOptions} options 
     * @returns {Promise<void>}
     */
    insert: async function(options) {
        dynamicAccess(options.file);
        const sql = sqlstr.insertStr(options);
        await db.query(sql, options.values);
    },

    /**
     * Asynchronous selection query.
     * @param {SelectionOptions} options 
     * @returns {SelectionPromise}
     */
    select: async function(options) {
        dynamicAccess(options.file);
        const { sql, args } = sqlstr.selectStr(options);
        const data = await db.query(sql, args);
        return (data.length > 0 && options.first) ? data[0] : data;
    },

    /**
     * Asynchronous update query.
     * @param {UpdateOptions} options 
     * @returns {Promise<void>}
     */
    update: async function(options) {
        dynamicAccess(options.file);
        const { sql, args } = sqlstr.updateStr(options);
        await db.query(sql, args);
    },

    /**
     * Asynchronous delete query.
     * @param {DeleteOptions} options 
     * @returns {Promise<void>}
     */
    delete: async function(options) {
        dynamicAccess(options.file);
        const { sql, args } = sqlstr.deleteStr(options);
        await db.query(sql, args);
    },

    /**
     * Synchronous query.
     * @param {function} query 
     * @param {string[]|BaseOptions} options 
     * @returns {QueryRetval}
     */
    sync: function(query, options = []) {
        if (query.constructor.name !== 'AsyncFunction') 
            throw new Error('Function is not asynchronous.');
        
        return sp(query)(options);
    }
}