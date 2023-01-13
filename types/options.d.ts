interface BooleanExpression {
    lhs: string,
    operator: string,
    rhs: string
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

interface SelectionStatementOptions extends BaseStatementOptions {
    first?: boolean,
    all?: boolean,
    columns?: string[],
    from: string,
    where?: (string | BooleanExpression)[]
}