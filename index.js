'use strict';
const fs = require('fs');
var file;

module.exports.file = function (filepath) {
    file = fs.readFileSync(filepath);
    console.log(file);
}