enum StatementType {
    insert,
    select,
    update,
    remove,
    upsert
}

interface StatementObject {
    sql: string,
    params: string[],
    parseData: () => (any|undefined);
}