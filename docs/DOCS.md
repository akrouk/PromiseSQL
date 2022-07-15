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
  into: 'users',
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