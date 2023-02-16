/** DATABASE */

/**
 * @typedef DatabaseOptions
 * @property {boolean} [memory]
 * @property {boolean} [disk]
 * @property {string} file
 * @property {boolean} [dynamic]
 */

/** EXPRESSIONS */

/**
 * @typedef BooleanExpression
 * @property {string} lhs
 * @property {string} operator
 * @property {string} rhs
 */

/** STATEMENTS */

/**
 * @typedef {'insert'|'select'|'update'|'remove'|'upsert'} StatementType
 * @typedef {'WHERE'|'SET'} ClauseType
 */

/** 
 * @typedef StatementObject
 * @property {string} sql
 * @property {any[]} params
 * @property {(data: any[]) => any|() => void} parseData
 */

/**
 * @typedef BaseStatementProperties
 * @property {string} [table]
 * 
 * @typedef InsertStatementProperties
 * @property {string} into
 * @property {string[]} [columns]
 * @property {string[]} values
 *
 * @typedef SelectStatementProperties
 * @property {boolean} [first]
 * @property {boolean} [all]
 * @property {string[]} [columns]
 * @property {string} from
 * @property {(string|types.BooleanExpression)[]} [where]
 * 
 * @typedef UpdateStatementProperties
 * @property {string} table
 * @property {(string|BooleanExpression)[]} set
 * @property {(string|BooleanExpression)[]} [where] 
 * 
 * @typedef RemoveStatementProperties
 * @property {string} from
 * @property {(string|BooleanExpression)[]} [where]
 */

/**
 * @typedef {BaseStatementProperties} BaseStatementOptions
 * @typedef {BaseStatementProperties & SelectStatementProperties} SelectStatementOptions
 * @typedef {BaseStatementProperties & InsertStatementProperties} InsertStatementOptions
 * @typedef {BaseStatementProperties & UpdateStatementProperties} UpdateStatementOptions
 * @typedef {BaseStatementProperties & RemoveStatementProperties} RemoveStatementOptions
 * @typedef {BaseStatementProperties & InsertStatementProperties & UpdateStatementProperties} UpsertStatementOptions
 */

module.exports = {}