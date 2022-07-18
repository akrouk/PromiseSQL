class PSQLError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}

module.exports = {
    PSQLError,
    
    /**
     * Access error - database is not open!
     */
    accessError: function() {
        throw new PSQLError('PSQLAccessError', 'Database is not open.');
    },

    /**
     * Async error - tried to run a synchronous function with sync
     */
    asyncError: function() {
        throw new PSQLError('PSQLAsyncError', 'Function is not asynchronous.');
    },

    /**
     * Missing type error.
     * @param {string} missing Name of the missing type
     */
    typeError: function(missing) {
        throw new PSQLError('PSQLTypeError', `No ${missing} specified.`);
    }
}