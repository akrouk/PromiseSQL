'use strict';
const sqlite = require('sqlite3').verbose();
var db;

function open(file) {
    db = new sqlite.Database(file, err => {
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
}

function close() {
    db.close();
    db = undefined;
}

module.exports.file = async function (filepath) {
    open(filepath);
    const sql = `
        CREATE TABLE IF NOT EXISTS mytable (name TEXT NOT NULL UNIQUE);
    `;
    await db.query(sql);
    close();
}