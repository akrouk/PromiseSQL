const { StatementBuilder, InsertStatementBuilder, SelectStatementBuilder, UpdateStatementBuilder, RemoveStatementBuilder } = require('../util/builders');
const { typeError } = require('../util/psql-error');
const sqlite = require('sqlite3').verbose();
const typedefs = require('../util/typedefs');

class PromiseDB extends sqlite.Database { 
    /**
     * Open a promise database file.
     * @param {string|typedefs.DatabaseOptions} options 
     */
    constructor(options) {
        const callback = error => error ? console.log(error) : void 0;

        // Filename string
        if (typeof options === 'string') {
            super(options, callback);
            return (this.file = options, this);
        }

        // Database options
        const { memory, disk, file } = options;
        const filename = memory ? ':memory:' : (disk ? '' : file);
        if (!filename) typeError('file');

        super(filename, callback);
        Object.assign(this, { memory, disk, file });

        // Dynamic access
        if (options.dynamic) this.cleanup = () => this.close();
    }

    /**
     * Returns a thenable object that fulfills an async query.
     * Also closes the database if it was dynamically accessed.
     * @param {any} rows 
     * @returns 
     */
    #fulfillQuery(rows) {
        return {
            then: onFulfill => {
                onFulfill(rows);
                if (this.cleanup) this.cleanup();
            }
        }
    }

    /**
     * Promise wrapper over node-sqlite3 all query.
     * "Runs the SQL query with the specified parameters and calls the callback with all result rows afterwards."
     * {@link https://github.com/TryGhost/node-sqlite3/wiki/API#allsql--param---callback}
     * @param {StatementBuilder|{ sql: string, params?: any }} options 
     * @returns 
     */
    query(options) {
        const { sql, params } = options instanceof StatementBuilder ? options.data : options;

        return new Promise((resolve, reject) => {
            this.all(sql, params ?? [], (error, rows) => {
                error ? reject(error) : resolve(this.#fulfillQuery(rows));
            });
        });
    }

    /**
     * @param {typedefs.InsertStatementOptions} options 
     * @returns 
     */
    insert(options) {
        return this.query(new InsertStatementBuilder(options));
    }

    /**
     * @param {typedefs.DatabaseOptions & typedefs.InsertStatementOptions} options 
     * @returns 
     */
    static insert(options) {
        const database = new this({ ...options, dynamic: true });
        return database.insert(options);
    }

    /**
     * @param {typedefs.SelectStatementOptions} options 
     * @returns 
     */
    select(options) {
        return this.query(new SelectStatementBuilder(options));
    }

    /**
     * @param {typedefs.DatabaseOptions & typedefs.SelectStatementOptions} options 
     * @returns
     */
    static select(options) {
        const database = new this({ ...options, dynamic: true });
        return database.select(options);
    }

    /**
     * @param {typedefs.UpdateStatementOptions} options 
     * @returns 
     */
    update(options) {
        return this.query(new UpdateStatementBuilder(options));
    }

    /**
     * @param {typedefs.DatabaseOptions & typedefs.UpdateStatementOptions} options 
     * @returns 
     */
    static update(options) {
        const database = new this({ ...options, dynamic: true });
        return database.update(options);
    }

    /**
     * @param {typedefs.RemoveStatementOptions} options 
     * @returns 
     */
    remove(options) {
        return this.query(new RemoveStatementBuilder(options));
    }

    /**
     * @param {typedefs.DatabaseOptions & typedefs.RemoveStatementOptions} options 
     * @returns 
     */
    static remove(options) {
        const database = new this({ ...options, dynamic: true });
        return database.remove(options);
    }
}

module.exports = { PromiseDB }