# PromiseSQL
A lightweight module for running simple, promise-based SQLite3 queries in node.js. It works best in smaller projects with a lot of asynchronous development, e.g., a Discord bot with slash commands.

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

This module is still a work in progress. By design, it was created as an SQL backend for interaction-based Discord bots built in [discord.js v13](https://discord.js.org/#/docs/discord.js/v13/general/welcome). It is intended to create more user-friendly, asynchronous query functions on top of [node-sqlite3](https://www.npmjs.com/package/sqlite3), which take in "options" objects as arguments, a practice inspired by discord.js. While it can run any query asychronous, it currently only supports the following built-in query and expression functions:

- Queries
  - Insert
  - Select
  - Update
  - Delete
- Expressions
  - Boolean
  - Aggregate

Presently, there are no plans to add functionality such as creating tables, attaching databases, etc. For now, I handle operations like that with [DB Browser](https://sqlitebrowser.org/), which is a great tool for managing tables and data in small SQLite3 databases.
