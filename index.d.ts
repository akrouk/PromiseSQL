declare module "promisesql";

type DataObject = Object;
type DataArray = DataObject[];

type QueryRetval = void | DataObject | DataArray;
type QueryPromise = Promise<QueryRetval>;

interface BaseOptions {
    file?: string,
}

interface RunOptions extends BaseOptions {
    statement: string,
    args?: any[]
}

interface InsertOptions extends BaseOptions {
    table: string,
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