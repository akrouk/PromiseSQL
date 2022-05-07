'use strict';
const sqlite = require('sqlite3').verbose();
var db;

class SqlMisuse extends Error {
    constructor(message) {
        super(message);
        this.name = 'SqlMisuse';
    }
}

module.exports = {
    open: function (filepath) {
        db = new sqlite.Database(filepath, err => {
            if (err) {
                console.error(err, err.stack);
            }
        });
    
        db.query = function (sql, params = []) {
            return new Promise((res, rej) => {
                this.all(sql, params, function (err, result) {
                    if (err) {
                        rej(err);
                    } else {
                        res(result);
                    }
                });
            });
        }
    },
    close: function () {
        db.close();
        db = undefined;
    },
    checkOpen: function () {
        if (!db) throw new SqlMisuse('Error: Database is not open.');
    },
    queryAsync: async function (sql, params) {
        this.checkOpen();
        return await db.query(sql, params);
    }
} 