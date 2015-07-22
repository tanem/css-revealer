'use strict';

var R = require('ramda');
var css = require('css');

module.exports = R.compose(
  R.uniq,
  R.chain(R.match(/([.#][^.#: ]+)/g)),
  R.chain(R.prop('selectors')),
  R.filter(R.propEq('rule', 'type')),
  R.prop('rules'),
  R.prop('stylesheet'),
  R.curryN(1, css.parse)
);
