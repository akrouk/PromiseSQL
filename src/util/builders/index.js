module.exports = {
    ...require('./statement-builder'),
    ...require('./insert-statement-builder'),
    ...require('./select-statement-builder'),
    ...require('./update-statement-builder'),
    ...require('./remove-statement-builder')
}