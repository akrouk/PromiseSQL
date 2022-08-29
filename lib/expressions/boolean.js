const booleanExpressions = new Object();

const fnData = [ 
    { name: 'eq', sign: '='}, 
    { name: 'lt', sign: '<' },
    { name: 'gt', sign: '>' },
    { name: 'leq', sign: '<=' },
    { name: 'geq', sign: '>=' }
];

fnData.forEach(expr => {
    booleanExpressions[expr.name] = (lhs, rhs) => new Object({ lhs, operator: expr.sign, rhs });
});

module.exports = booleanExpressions;