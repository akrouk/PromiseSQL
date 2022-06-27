declare module "promisesql";

interface BaseOptions {
    filepath?: string,
}

interface InsertOptions extends BaseOptions {
    table: string,
    columns?: string[],
    values: string[]
}

interface SelectionOptions extends BaseOptions {
    all?: boolean,
    columns?: string[],
    from: string,
    where?: (string | Expression)[]
}

interface UpdateOptions extends BaseOptions {
    table: string,
    set: (string | Expression)[],
    where?: (string | Expression)[]
}

interface DeleteOptions extends BaseOptions {
    table: string,
    where?: (string | Expression)[]
}

interface Expression {
    lhs: string,
    operator: string,
    rhs: string
}

interface Datatype {
    name: string,
    notnull?: boolean,
    unique?: boolean,
    primaryKey?: boolean,
    check?: string,
    default?: string
}