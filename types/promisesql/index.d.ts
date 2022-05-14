declare module "promisesql";

const Operators = [ 'AND', 'OR', 'NOT' ];

interface BaseArguments {
    filepath?: string,
}

interface SelectionArguments extends BaseArguments {
    all?: boolean,
    columns?: Array<string>,
    from: string,
    where?: Array<Array<string>|string>
}