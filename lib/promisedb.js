const sqlite = require('sqlite3').verbose();

class PromiseDB extends sqlite.Database {
    /**
     * Construct a promise database at {@link filepath}
     * @param {string} filepath 
     */
    constructor(filepath) {
        super(filepath, error => {
            if (error) console.error(error, error.stack);
        });
    }

    /**
     * Promise-based query OR command. 
     * @param {string} sql 
     * @param {string[]} args 
     * @returns {Promise<object>}
     */
    query(sql, args = []) {
        return new Promise((resolve, reject) => {
            this.all(sql, args, function(error, result) {
                error ? reject(error) : resolve(result);
            });
        });
    }
}

module.exports = { PromiseDB }