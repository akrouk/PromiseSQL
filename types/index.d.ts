declare module "util/psql-error" {
    export class PSQLError extends Error {
        /**
         * @param {string} name
         * @param {string} message
         */
        constructor(name: string, message: string);
    }
    export function accessError(open?: boolean): never;
    export function asyncError(): never;
    export function typeError(missing: string): never;
}
declare module "util/sql/statement-builder" {
    export class StatementBuilder {
        /**
         * @param {StatementType} type
         * @param {BaseStatementOptions} options
         */
        constructor(type: StatementType, options: BaseStatementOptions);
        /**
         * @returns {StatementObject}
         */
        get data(): StatementObject;
        #private;
    }
}
declare module "lib/promisedb" {
    const PromiseDB_base: any;
    export class PromiseDB extends PromiseDB_base {
        [x: string]: any;
        /**
         * Open a promise database file.
         * @param {string|null} file
         * @param {BaseStatementOptions|null} options
         */
        constructor(file: string | null, options?: BaseStatementOptions | null);
        cleanup: () => any;
        /**
         * Promise wrapper over node-sqlite3 all query.
         * "Runs the SQL query with the specified parameters and calls the callback with all result rows afterwards."
         * {@link https://github.com/TryGhost/node-sqlite3/wiki/API#allsql--param---callback}
         * @override
         * @param {{ sql: string, params?: any }|StatementBuilder} options
         * @returns
         */
        override run(options: StatementBuilder | {
            sql: string;
            params?: any;
        }): Promise<any>;
        #private;
    }
    import { StatementBuilder } from "util/sql/statement-builder";
    export {};
}
declare module "util/helpers" {
    /**
     *
     * @param {Object[]} data
     */
    export function simplifyArray(data: any[]): void;
    /**
     *
     * @param {Object} data
     */
    export function simplifyObject(datum: any): void;
    export function parseColumns(columns: string[]): any;
    export function parseValues(values: string[]): string;
    export function parseClause(type: string, expressions: any[], delimiter?: string): {
        stmt: string;
        conditions: any[];
    };
    export function isOpen(db: any): void;
}
declare module "util/string" {
    export function insertStr(options: InsertOptions): string;
    export function selectStr(options: SelectionStatementOptions): any;
    export function updateStr(options: UpdateOptions): any;
    export function deleteStr(options: DeleteOptions): any;
}
declare module "lib/queries" {
    const _exports: {
        Select: any;
        sync: typeof sync;
        /**
         * Asynchronous delete query. Optional overload, since 'delete' is reserved keyword.
         * @param {DeleteOptions} options
         * @returns {Promise<void>}
         */
        delete: (options: DeleteOptions) => Promise<void>;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        simplifyOutput: (bit?: any) => boolean;
        open: typeof open;
        close: typeof close;
        get: typeof get;
    };
    export = _exports;
    /**
     * Synchronous query.
     * @param {Function} query
     * @param {string[]|BaseOptions} options
     * @returns {QueryRetval}
     */
    function sync(query: Function, options?: string[] | BaseOptions): QueryRetval;
    /**
     * Opens a database file.
     * @param {string} file Relative path to the database file
     * @returns {void|never}
     */
    function open(file: string): void | never;
    /**
     * Closes an open database.
     * @returns {void|never}
     */
    function close(): void | never;
    /**
     * Retrieves the database, if open.
     * @returns {PromiseDB|never}
     */
    function get(): PromiseDB | never;
    import { PromiseDB } from "lib/promisedb";
}
declare module "lib/expressions/boolean" {
    export = booleanExpressions;
    const booleanExpressions: Object;
}
declare module "lib/expressions/numeric" {
    export = numericExpressions;
    const numericExpressions: Object;
}
declare module "lib/operators/logic" {
    export const AND: string;
    export const OR: string;
    export const NOT: string;
}
declare module "promisesql" {
    const _exports: {
        increment: (column: any) => string;
        decrement: (column: any) => string;
        expression: {
            constructor: Function;
            toString(): string;
            toLocaleString(): string;
            valueOf(): Object;
            hasOwnProperty(v: PropertyKey): boolean;
            isPrototypeOf(v: Object): boolean;
            propertyIsEnumerable(v: PropertyKey): boolean;
        };
        operator: {
            AND: string;
            OR: string;
            NOT: string;
        };
        Select: any;
        sync: (query: Function, options?: any) => QueryRetval;
        delete: (options: DeleteOptions) => Promise<void>;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        simplifyOutput: (bit?: any) => boolean;
        open: (file: string) => void;
        close: () => void;
        get: () => import("lib/promisedb").PromiseDB;
        PromiseDB: typeof import("lib/promisedb").PromiseDB;
    };
    export = _exports;
}
declare module "util/sql/statement" {
    export class Statement {
        /**
         * @param {PromiseDB|null} database
         * @param {StatementType} type
         * @param {BaseStatementOptions} options
         */
        constructor(database: PromiseDB | null, type: StatementType, options: BaseStatementOptions);
        /**
         * @returns
         */
        run(): Promise<any>;
        #private;
    }
    import { PromiseDB } from "lib/promisedb";
}
//# sourceMappingURL=index.d.ts.map