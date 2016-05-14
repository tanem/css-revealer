# css-revealer

[![build status](https://img.shields.io/travis/tanem/css-revealer/master.svg?style=flat-square)](https://travis-ci.org/tanem/css-revealer)
[![npm version](https://img.shields.io/npm/v/css-revealer.svg?style=flat-square)](https://www.npmjs.com/package/css-revealer)
[![npm downloads](https://img.shields.io/npm/dm/css-revealer.svg?style=flat-square)](https://www.npmjs.com/package/css-revealer)

Reveal CSS selector usage within HTML templates.

```
Usage: css-revealer {OPTIONS}

Options:
  -s, --stylesheets  Stylesheets glob  [array] [required]
  -t, --templates    Templates glob    [array] [required]
  -o, --output       Output format     [default: "json"]

Examples:
  css-revealer -s *.css -t *.html
  css-revealer -s *.css -t *.html -o markdown
```

## installation

```
$ npm install -g css-revealer
```

## usage

To generate a JSON report of CSS selector usage from stylesheets within a `styles` directory, for templates in a `templates` directory:

```
$ css-revealer -s styles/*.css -t templates/*.html
```

You can also use the API directly:

```js
var cssRevealer = require('css-revealer');

cssRevealer({
  stylesheets: ['styles/*.css'],
  templates: ['templates/*.html'],
  done: function(error, result){
    if (error) return process.stderr.write(error);
    process.stdout.write(result);
  }
});
```

## api

```js
var cssRevealer = require('cssRevealer');
```

### `cssRevealer(options)`

`options.stylesheets` is a required array of globs specifying which stylesheets to extract selectors from.

`options.templates` is a required array of globs specifying which templates to check for selector presence.

`options.format` is an optional string specifying which built-in report format to use [`json`](test/fixtures/format.json) or [`markdown`](test/fixtures/format.md), or a custom format function which gets passed the [`result`](test/fixtures/result.js) object. Defaults to `json`.

`options.done` is an optional function to execute when the report is complete. It gets passed an `error` (which can be `null`) and the formatted `result`.

## implementation

* [isaacs/node-glob](https://github.com/isaacs/node-glob) is the glob implementation.
* [reworkcss/css](https://github.com/reworkcss/css) is the underlying CSS parser.
* If multiple stylesheets are passed, they are concatenated in the order returned by `node-glob`, prior to being parsed.
* It has a fairly simple way of parsing and checking for selectors, check out the unit tests to see how it works :wink:

## tests

```
$ npm test
```

## license

MIT
