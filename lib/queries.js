const { PromiseDB } = require('./promisedb');
const { accessError, asyncError } = require('../util/psql-error');
const str = require('../util/string');
const sp = require('synchronized-promise');

// Current database (undefined if not open)
var db = undefined;

/**
 * Opens a database file.
 * @param {string} file Relative path to the database file
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
 * Retrieves the database, if open.
 * @returns {PromiseDB|never}
 */
function get() {
    if (db instanceof PromiseDB) return db;
    accessError();
}

/**
 * Dynamically opens and closes a database if a file is provided.
 * @param {string} file Relative path to the database file
 * @returns {void|Promise<void>}
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
        } catch (error) {
            reject(error);
        }
    });
}

/* ================ QUERIES ================ */

/**
 * Asynchronous database query.
 * @param {RunOptions} options SQL statement
 * @returns {QueryPromise}
 */
async function run(options) {
    dynamicAccess(options.file);
    return await db.query(options.statement, options.args);
}

/**
 * Asynchronous instert query.
 * @param {InsertOptions} options 
 * @returns {Promise<void>}
 */
async function insert(options) {
    dynamicAccess(options.file);
    const sql = str.insertStr(options);
    await db.query(sql, options.values);
}

/**
 * Asynchronous selection query.
 * @param {SelectionOptions} options 
 * @returns {SelectionPromise}
 */
async function select(options) {
    dynamicAccess(options.file);
    const { sql, args } = str.selectStr(options);
    const data = await db.query(sql, args);
    return (data.length > 0 && options.first) ? data[0] : data;
}

/**
 * Asynchronous update query.
 * @param {UpdateOptions} options 
 * @returns {Promise<void>}
 */
async function update(options) {
    dynamicAccess(options.file);
    const { sql, args } = str.updateStr(options);
    await db.query(sql, args);
}

/**
 * Asynchronous delete query.
 * @param {DeleteOptions} options 
 * @returns {Promise<void>}
 */
async function remove(options) {
    dynamicAccess(options.file);
    const { sql, args } = str.deleteStr(options);
    await db.query(sql, args);
}

/**
 * Asynchronous upsert query. 
 * @param {UpsertOptions} options 
 * @returns {Promise<void>}
 */
async function upsert(options) {
    await insert(options).catch(async error => {
        if (error.code !== 'SQLITE_CONSTRAINT') throw new error; 
        if (!options.table) options.table = options.into;
        await update(options);
    });
}

/**
 * Synchronous query.
 * @param {Function} query 
 * @param {string[]|BaseOptions} options 
 * @returns {QueryRetval}
 */
function sync(query, options = []) {
    if (query.constructor.name !== 'AsyncFunction') asyncError();
    return sp(query)(options);
}

module.exports = {
    // Export database open/close functions (synchronous!)
    open, close, get,

    // Queries
    run, insert, select, update, remove, upsert, sync,

    /**
     * Asynchronous delete query. Optional overload, since 'delete' is reserved keyword.
     * @param {DeleteOptions} options 
     * @returns {Promise<void>}
     */
    delete: async options => await remove(options)
}