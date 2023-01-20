const { StatementBuilder } = require('../util/builders/statement-builder');
const sqlite = require('sqlite3').verbose();

class PromiseDB extends sqlite.Database { 
    /**
     * Open a promise database file.
     * @param {string|null} file 
     * @param {BaseStatementOptions|null} options
     */
    constructor(file, options = null) {
        super(file ?? options.file, error => error ? console.log(error) : void 0);
        if (options && options.file) this.cleanup = () => this.close();
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
        let { sql, params } = options instanceof StatementBuilder ? options.data : options;

        return new Promise((resolve, reject) => {
            this.all(sql, params ?? [], (error, rows) => {
                error ? reject(error) : resolve(this.#fulfillQuery(rows));
            });
        });
    }
}

module.exports = { PromiseDB }