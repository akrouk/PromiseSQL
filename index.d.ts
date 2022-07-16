declare module "promisesql";

type DataObject = Object;
type DataArray = DataObject[];

type QueryRetval = void | DataObject | DataArray;
type QueryPromise = Promise<QueryRetval>;

interface BaseOptions {
    file?: string,
    table?: string
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

type SelectionRetval = DataObject | DataArray;
type SelectionPromise = Promise<SelectionRetval>;

interface SelectionOptions extends BaseOptions {
    first?: boolean,
    all?: boolean,
    columns?: string[],
    from: string,
    where?: (string | BooleanExpression)[]
}

interface UpdateOptions extends BaseOptions {
    table: string,
    set: (string | BooleanExpression)[],
    where?: (string | BooleanExpression)[]
}

interface DeleteOptions extends BaseOptions {
    from: string,
    where?: (string | BooleanExpression)[]
}

interface BooleanExpression {
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