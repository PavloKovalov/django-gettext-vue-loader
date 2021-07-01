var babel = require('babel-core'),
    djangoGettextTransformPlugin = require('./babel-django-gettext-transform-plugin');

var matchPatterns = [
        '\{\{(.+?)\}\}',
        ':[a-zA-Z]+="[^_\n]*(_[\(]\'.+\'[\)])"'
    ],
    regExp = new RegExp(matchPatterns.join('|'), 'gi');

module.exports = function (source) {
    source = source.replace(regExp, function (full, ...matched) {
        var matchedExpression = matched.slice(0, matchPatterns.length).filter(Boolean)[0];
        var result = babel.transform(matchedExpression.trim(), {
            plugins: [djangoGettextTransformPlugin]
        });
        var newExpression = result.code.replace(/;$/, '');
        
        if (new RegExp(matchPatterns[0]).test(full)) {
            newExpression = ' ' + newExpression + ' ';
        }

        return full.replace(matchedExpression, newExpression);
    });
    return source;
};
