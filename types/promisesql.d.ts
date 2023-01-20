declare module "util/typedefs/properties" {
    export type BaseStatementProperties = {
        file?: string;
        table?: string;
    };
    export type InsertStatementProperties = {
        into: string;
        columns?: string[];
        values?: string[];
    };
    export type SelectStatementProperties = {
        first?: boolean;
        all?: boolean;
        columns?: string[];
        from: string;
        where?: (string | types.BooleanExpression)[];
    };
    import types = require("util/typedefs/types");
}
declare module "util/typedefs/types" {
    export type BooleanExpression = {
        lhs: string;
        operator: string;
        rhs: string;
    };
    export type StatementType = 'insert' | 'select' | 'update' | 'remove' | 'upsert';
    export type ClauseType = 'WHERE' | 'SET';
    export type StatementObject = {
        sql: string;
        params: any[];
        parseData: (data: any[]) => any;
    };
    export type BaseStatementOptions = properties.BaseStatementProperties;
    export type SelectStatementOptions = properties.BaseStatementProperties & properties.SelectStatementProperties;
    export type InsertStatementOptions = properties.BaseStatementProperties & properties.InsertStatementProperties;
    import properties = require("util/typedefs/properties");
}
declare module "util/builders/insert-statement-builder" {
    export class InsertStatementBuilder extends StatementBuilder {
        constructor(options: types.InsertStatementOptions);
        setInto(into: string): void;
        into: string;
        table: string;
    }
    import { StatementBuilder } from "util/builders/statement-builder";
    import types = require("util/typedefs/types");
}
declare module "util/builders/clause-builder" {
    export function buildClause(type: ClauseType, expressions: (string | types.BooleanExpression)[] | undefined): {
        clause: string[];
        conditions: string[];
    };
    import types = require("util/typedefs/types");
}
declare module "util/psql-error" {
    export class PSQLError extends Error {
        constructor(name: string, message: string);
    }
    export function accessError(open?: boolean): never;
    export function asyncError(): never;
    export function typeError(missing: string): never;
}
declare module "util/builders/select-statement-builder" {
    export class SelectStatementBuilder extends StatementBuilder {
        constructor(options: types.SelectStatementOptions);
        get data(): {
            sql: string;
            params: string[];
            parseData: (data: any[]) => any;
        };
        setFirst(first: boolean): SelectStatementBuilder;
        first: boolean;
        setAll(all: boolean): SelectStatementBuilder;
        all: boolean;
        setColumns(columns: string[]): SelectStatementBuilder;
        columns: string[];
        setFrom(from: string): SelectStatementBuilder;
        from: string;
        table: string;
        setWhere(where: (string | types.BooleanExpression)[]): SelectStatementBuilder;
        where: (string | types.BooleanExpression)[];
    }
    import { StatementBuilder } from "util/builders/statement-builder";
    import types = require("util/typedefs/types");
}
declare module "util/builders/statement-builder" {
    export type InsertStatementBuilder = import("util/builders/insert-statement-builder").InsertStatementBuilder;
    export type SelectStatementBuilder = import("util/builders/select-statement-builder").SelectStatementBuilder;
    export type Builders = InsertStatementBuilder | SelectStatementBuilder;
    export class StatementBuilder {
        constructor(type?: types.StatementType, options?: types.BaseStatementOptions);
        type: types.StatementType;
        options: import("util/typedefs/properties").BaseStatementProperties;
        get builder(): Builders;
        get data(): types.StatementObject;
        get sql(): string;
        get params(): any[];
        get parseData(): (data: any[]) => any;
        setType(type: types.StatementType): Builders;
        setOptions(options: types.BaseStatementOptions): StatementBuilder;
        protected punctuate(statement: string[]): string;
    }
    import types = require("util/typedefs/types");
}
declare module "lib/promisedb" {
    const PromiseDB_base: typeof import("sqlite3").Database;
    export class PromiseDB extends PromiseDB_base {
        constructor(file: string | null, options?: BaseStatementOptions | null);
        cleanup: () => void;
        query(options: StatementBuilder | {
            sql: string;
            params?: any;
        }): Promise<any>;
        #private;
    }
    import { StatementBuilder } from "util/builders/statement-builder";
    export {};
}
declare module "lib/statement" {
    export class SelectStatement extends Statement {
        constructor(database: PromiseDB | null, options: SelectStatementOptions);
    }
    class Statement {
        constructor(database: PromiseDB | null, type: StatementType, options: BaseStatementOptions);
        run(): Promise<any>;
        #private;
    }
    import { PromiseDB } from "lib/promisedb";
    export {};
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
        select: (options: SelectStatementOptions) => Promise<any>;
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
        PromiseDB: typeof PromiseDB;
    };
    export = _exports;
    import { PromiseDB } from "lib/promisedb";
}
//# sourceMappingURL=promisesql.d.ts.map