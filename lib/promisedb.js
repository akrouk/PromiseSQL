const sqlite = require('sqlite3').verbose();

class PromiseDB extends sqlite.Database {
    constructor(filename) {
        super(filename, error => {
            if (error) console.error(error, error.stack);
        });
    }

    // Asynchronous database query 
    query(sql, args = []) {
        return new Promise((res, rej) => {
            this.all(sql, args, function (error, result) {
                error ? rej(error) : res(result);
            });
        });
    }
}

module.exports = { PromiseDB }