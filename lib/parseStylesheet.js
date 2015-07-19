'use strict';

var _ = require('lodash');
var css = require('css');
var prop = require('./util').prop;
var propEq = require('./util').propEq;
var match = require('./util').match;

module.exports = function parse(stylesheet) {

  return _.chain(css.parse(stylesheet))
    .at('stylesheet')
    .map(prop('rules'))
    .flatten()
    .filter(propEq('type', 'rule'))
    .map(prop('selectors'))
    .flatten()
    .map(match(/([.#][^.#: ]+)/g))
    .flatten()
    .uniq()
    .value();

};
