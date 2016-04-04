django-gettext-vue-loader
=====

[![Build Status](https://travis-ci.org/PavloKovalov/django-gettext-vue-loader.svg?branch=master)](https://travis-ci.org/PavloKovalov/django-gettext-vue-loader)

Loader for vue.js templates that allows to use django gettext template syntax

:warning: Implementation is very raw, but usable for simple cases

## Install

```sh
$ npm install --save-dev django-gettext-vue-loader
```

## Usage (with webpack and vue-loader)

Add loader to your `webpack.config.js` in pipeline with `vue-loader`

``` javascript
{
  module: { loaders: [
      {
          test: /\.html$/,
          loader: 'vue-html!django-gettext-vue'
      }
    ]
  }
}
```

Add template

``` html
<p>{{ _('lorem ipsum dolor sit amet') }}</p>
```

Then `require` html templates as usual

``` javascript
// my-component.es2015.js
import template from './templates/my-component.html';

export default {
  template,

  props: {
    // whatever
  }
}
```

## Usage (API)

``` javascript
// es2015 way
import loader from 'django-gettext-vue-loader';
// or
var loader = require('django-gettext-vue-loader');

loader(sourceString); // return transformed string
```

## Run tests

```sh
npm test
```
or

```sh
node tests.js
```

## License
[MIT](https://opensource.org/licenses/MIT)
