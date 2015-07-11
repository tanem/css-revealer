'use strict';

var _ = require('lodash');
var css = require('css');
var split = require('./util').split;
var head = require('./util').head;
var test = require('./util').test;
var concat = require('./util').concat;
var prop = require('./util').prop;
var propEq = require('./util').propEq;

module.exports = function parse(stylesheet) {

  var ast = css.parse(stylesheet);
  var astRules = ast.stylesheet.rules;

  return _.chain(astRules)
    .filter(propEq('type', 'rule'))
    .map(prop('selectors'))
    .reduce(concat, [])
    .map(split(' '))
    .reduce(function(memo, array){
      return memo.concat(
        array
          .filter(test(/^[#.]/))
          .map(_.compose(head, split(':')))
          .map(split(/([.#][^.#]+)/g))
          .reduce(concat, [])
          .filter(test(/[^\s]/))
      );
    }, [])
    .uniq()
    .value();

};
