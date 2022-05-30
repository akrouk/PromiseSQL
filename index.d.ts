declare module "promisesql";

interface BaseOptions {
    filepath?: string,
}

interface SelectionOptions extends BaseOptions {
    all?: boolean,
    columns?: string[],
    from: string,
    where?: (string | string[])[]
}

interface InsertOptions extends BaseOptions {
    table: string,
    columns?: string[],
    values?: (string[])[]
}

interface Expression {
    lhs: string,
    operator: string,
    rhs: string
}