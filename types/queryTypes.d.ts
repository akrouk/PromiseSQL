interface BooleanExpression {
    lhs: string,
    operator: string,
    rhs: string
}

interface BaseOptions {
    file?: string,
    table?: string,
}

interface RunOptions extends BaseOptions {
    statement: string,
    args?: any[]
}

interface InsertOptions extends BaseOptions {
    into: string,
    columns?: string[],
    values: string[]
}

interface SelectionOptions extends BaseOptions {
    first?: boolean,
    all?: boolean,
    columns?: string[],
    from: string,
    where?: (string | BooleanExpression)[]
}