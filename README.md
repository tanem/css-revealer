# css-revealer

[![Build Status](https://travis-ci.org/tanem/css-revealer.png?branch=master)](https://travis-ci.org/tanem/css-revealer)
[![NPM version](https://badge.fury.io/js/css-revealer.svg)](http://badge.fury.io/js/css-revealer)

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

## Installation

```
$ npm install -g css-revealer
```

## Usage

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

## API

### `cssRevealer(options:Object)`

* `options.stylesheets` (required) array of globs specifying which stylesheets to extract selectors from.
* `options.templates` (required) array of globs specifying which templates to check for selector presence.
* `options.format` (optional) either a string specifying which built-in report format to use (`markdown` or `json`), or a custom format function which gets passed the `result` object.
* `options.done` (optional) function to execute when the report is complete. It gets passed an `error` (which can be `null`) and the formatted `result`.

## Notes

* [isaacs/node-glob](https://github.com/isaacs/node-glob) is the glob implementation.
* [reworkcss/css](https://github.com/reworkcss/css) is the underlying CSS parser.
* If multiple stylesheets are passed, they are concatenated in the order returned by `node-glob`, prior to being parsed.
* It has a fairly simple way of parsing and checking for selectors, check out the unit tests to see how it works :wink:

## Tests

```
$ npm test
```