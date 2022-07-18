# :hatching_chick: PromiseSQL
A [node-sqlite3](https://www.npmjs.com/package/sqlite3) wrapper for running simple, asynchronous database queries in Node.js. PromiseSQL is for those who take their coffee with syntactic sugar instead of black ☕. It's best suited for smaller projects that require resolving lots of promises, e.g., a Discord bot that implements slash commands.

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

# Documentation
Documentation can be found on the [wiki](https://github.com/akrouk/PromiseSQL/wiki/Documentation).
