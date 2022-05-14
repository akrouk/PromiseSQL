declare module "promisesql";

interface BaseArguments {
    filepath?: string,
}

interface SelectionArguments extends BaseArguments {
    all?: boolean,
    columns?: string[],
    from: string,
    where?: string[]
}