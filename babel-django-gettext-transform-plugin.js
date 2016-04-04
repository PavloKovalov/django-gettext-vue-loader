module.exports = function (babel) {
    var t = babel.types;

    return {
        visitor: {
            SequenceExpression: function SequenceExpression(path) {
                var node = path.node;

                return t.ArrayExpression(node.expressions);
            },
            CallExpression: function CallExpression(path) {
                if (path.node.callee.name === '_') {
                    path.node.callee.name = 'gettext';
                }
            },
            BinaryExpression: function BinaryExpression(path) {
                var node = path.node,
                    l = node.left,
                    r = node.right,
                    args = [];

                if (node.operator === '%') {
                    args.push(l);
                    if (t.isObjectExpression(r) || t.isArrayExpression(r)) {
                        args.push(r);
                    } else if (t.isSequenceExpression(r)) {
                        args.push(t.ArrayExpression(r.expressions));
                    } else if (t.isIdentifier(r)) {
                        args.push(t.ArrayExpression([r]));
                    }

                    return path.replaceWith(t.CallExpression(t.Identifier('interpolate'), args));
                }

                if (node.operator === '|') {
                    args.push(t.CallExpression(t.Identifier('gettext'), l.arguments));

                    if (t.isBinaryExpression(r) && r.operator === '%') {
                        if (t.isObjectExpression(r.right)) {
                            args.push(t.ObjectExpression(r.right.properties));
                            args.push(t.BooleanLiteral(true));
                        }
                    }

                    return path.replaceWith(t.CallExpression(t.Identifier('interpolate'), args));
                }
            }
        }
    };
};
