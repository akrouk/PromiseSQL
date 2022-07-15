# :hatching_chick: PromiseSQL
A [node-sqlite3](https://www.npmjs.com/package/sqlite3) wrapper for running simple, promise-based database queries in Node.js. It works best in smaller projects with a lot of asynchronous development, e.g., a Discord bot that implements slash commands.

```javascript
const db = require('promisesql');
db.open('./database.db');

(async () => {
  const data = await db.select({
    all: true,
    from: 'lorem',
    where: [ db.expression.eq('ipsum', 'dolor') ]
  });
  
  data.forEach(datum => console.log(datum.dolor));
})();

db.close();
```

***This module is still a work in progress.***

By design, it was created as an SQL backend for interaction-based Discord bots built in [discord.js v13](https://discord.js.org/#/docs/discord.js/v13/general/welcome). It is intended to create more user-friendly, asynchronous query functions, which take in an "options" object as arguments, a practice inspired by discord.js. 

While it can run any query asychronously, it currently only supports the following built-in query and expression functions:

## Queries

### Base Options
`{ file?: string, table?: string }`

Any query can be run with the `file` option, which represents the relative path to a database file. The database will be accessed dynamically during the query and will only remain open until its resolution. This is ideal for avoiding the clutter of synchronously accessing a database when only a single query needs to be run.

```javascript
// No need to call db.open('./database.db') or db.close(). This query will handle that itself!
const data = await db.select({ file: './database.db', all: true, from: 'table' }); 
```

### Insert
`insert({ into: string, columns?: string[], values: string[] })`
```javascript
var id = '123456789';
var username = 'user99';

await db.insert({
  table: 'users',
  columns: [ 'id', 'username' ],
  values: [ id, username ]
});
```

### Select
### Update
### Delete

## Expressions
  - Boolean
  - Aggregate

## Future plans
Presently, there are no plans to add functionality such as creating tables, attaching databases, etc. For now, I handle operations like that with [DB Browser](https://sqlitebrowser.org/), which is a great tool for managing tables and data in small SQLite3 databases.
