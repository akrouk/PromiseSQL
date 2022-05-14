module.exports = {
    isOpen: function(db) {
        if (!db) throw 'Database is not open.';
    },
    isObj: function(args) {
        if (args.constructor.name !== 'Object') throw 'Arguments are not an object.';
    },
    validate: function(db, args) {
        this.isOpen(db);
        this.isObj(args);
    }
}