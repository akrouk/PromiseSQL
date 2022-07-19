const numericExpressions = new Object();

[ 'max', 'min', 'count', 'avg', 'sum' ].forEach(func => {
    numericExpressions[func] = options => `${func.toUpperCase()}(${options.all ? '*' : options})`;
});

module.exports = numericExpressions;