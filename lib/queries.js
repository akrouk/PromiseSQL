const { PromiseDB } = require('./promisedb');
const { accessError, asyncError } = require('../util/psql-error');
const { simplifyArray, simplifyObject } = require('../util/helpers');
const str = require('../util/string');
const sp = require('synchronized-promise');

// Current database (undefined if not open)

/** @type {PromiseDB|undefined} */
var db = undefined;

var simplify = false; 

/**
 * Opens a database file.
 * @param {string} file Relative path to the database file
 * @returns {void|never}
 */
function open(file) {
    if (db instanceof PromiseDB) {
        close();
        accessError(true);
    }

    db = new PromiseDB(file);
}

/**
 * Closes an open database.
 * @returns {void|never}
 */
function close() {
    db instanceof PromiseDB ? db.close() : accessError();
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
    if (!file || db instanceof PromiseDB) return;

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

class Query {
    /**
     * Query constructor - handles dynamic database access
     * @param {BaseOptions} options 
     */
    constructor(options) {
        this.options = options;
        dynamicAccess(options.file);
    }

    /**
     * Asynchronous database query.
     * @returns {QueryPromise}
     */
    async run() {
        return await db.query(this.options.statement, this.options.args);
    }

    /**
     * Asynchronous instert query.
     * @returns {Promise<void>}
     */
    async insert() {
        const sql = str.insertStr(this.options);
        await db.query(sql, this.options.values);
    }

    /**
     * Asynchronous selection query.
     * @returns {SelectionPromise}
     */
    async select() {
        const { sql, args } = str.selectStr(this.options);
        const data = await db.query(sql, args);
        return (data.length > 0 && this.options.first) ? data[0] : data;
    }

    /**
     * Asynchronous update query.
     * @returns {Promise<void>}
     */
    async update() {
        const { sql, args } = str.updateStr(this.options);
        await db.query(sql, args);
    }

    /**
     * Asynchronous delete query.
     * @returns {Promise<void>}
     */
    async remove() {
        const { sql, args } = str.deleteStr(this.options);
        await db.query(sql, args);
    }

    /**
     * Asynchronous upsert query. 
     * @returns {Promise<void>}
     */
    async upsert() {
        await this.insert(this.options).catch(async error => {
            if (error.code !== 'SQLITE_CONSTRAINT') throw new error; 
            if (!this.options.table) this.options.table = this.options.into;
            await this.update(this.options);
        });
    }
}

/**
 * @param {BaseOptions} options 
 */
const query = options => {
    dynamicAccess(options.file);
    return {
        select: async () => {
            const { sql, args } = str.selectStr(options);
            const data = await db.query(sql, args);
            return (data.length > 0 && options.first) ? data[0] : data;
        }
    }
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

const queryNames = Object.getOwnPropertyNames(Query.prototype).filter(name => name !== 'constructor'), queries = new Object();

queryNames.forEach(name => {
    queries[name] = async options => {
        const query = new Query(options);
        const run = query[name]();
        if (simplify) run.then(data => Array.isArray(data) ? simplifyArray(data) : simplifyObject(data));
        return await run;
    }
});

module.exports = {
    simplifyOutput: (bit = undefined) => typeof bit === 'boolean' ? simplify = bit : simplify = !simplify,

    // Export database open/close functions (synchronous!)
    open, close, get,

    // Queries
    ...queries,

    Select,

    sync,

    /**
     * Asynchronous delete query. Optional overload, since 'delete' is reserved keyword.
     * @param {DeleteOptions} options 
     * @returns {Promise<void>}
     */
    delete: async options => await queries.remove(options)
}