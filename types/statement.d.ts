type StatementType = (
    'insert' | 
    'select' |
    'update' |
    'remove' |
    'upsert'
);

interface StatementObject {
    sql: string,
    params: any,
    parseData: (data: any[]) => any;
}


interface BaseStatementOptions {
    file?: string,
    table?: string,
}

interface InsertStatementOptions extends BaseStatementOptions {
    into: string,
    columns?: string[],
    values: string[]
}

interface SelectStatementOptions extends BaseStatementOptions {
    first?: boolean,
    all?: boolean,
    columns?: string[],
    from: string,
    where?: (string | BooleanExpression)[]
}

type ClauseType = ('WHERE' | 'SET')