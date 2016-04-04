var babel = require('babel-core'),
    djangoGettextTransformPlugin = require('./babel-django-gettext-transform-plugin');

module.exports = function (source) {
    source = source.replace(/\{\{(.+?)\}\}/gi, function (full, matched) {
        var result = babel.transform(matched.trim(), {
            plugins: [djangoGettextTransformPlugin]
        });

        return '{{ ' + result.code.replace(/;$/, '') + ' }}';
    });
    return source;
};
