const numericExpressions = new Object();

[ 'max', 'min', 'count', 'avg', 'sum' ].forEach(fn => {
    numericExpressions[fn] = options => `${fn.toUpperCase()}(${options.all ? '*' : options})`;
});

module.exports = numericExpressions;