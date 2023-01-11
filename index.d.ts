declare module "promisesql";

export type DataObject = Object;
export type DataArray = DataObject[];

export type QueryRetval = void | DataObject | DataArray;
export type QueryPromise = Promise<QueryRetval>;

export interface BaseOptions {
    file?: string,
    table?: string
}

export interface RunOptions extends BaseOptions {
    statement: string,
    args?: any[]
}

export interface InsertOptions extends BaseOptions {
    into: string,
    columns?: string[],
    values: string[]
}

export type SelectionRetval = DataObject | DataArray;
export type SelectionPromise = Promise<SelectionRetval>;

export interface SelectionOptions extends BaseOptions {
    first?: boolean,
    all?: boolean,
    columns?: string[],
    from: string,
    where?: (string | BooleanExpression)[]
}

export interface UpdateOptions extends BaseOptions {
    table: string,
    set: (string | BooleanExpression)[],
    where?: (string | BooleanExpression)[]
}

export interface DeleteOptions extends BaseOptions {
    from: string,
    where?: (string | BooleanExpression)[]
}

export interface UpsertOptions extends InsertOptions {
    set: (string | BooleanExpression)[],
    where?: (string | BooleanExpression)[] 
}

export interface BooleanExpression {
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