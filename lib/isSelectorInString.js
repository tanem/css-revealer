'use strict';

var R = require('ramda');
var escape = require('escape-regexp');

module.exports = function(selector, string){

  var isId = R.test(/^#/);
  var isClass = R.test(/^\./);
  var sanitise = R.compose(escape, R.replace(/^([#.])/, ''));

  if (isId(selector)) {
    return new RegExp('id="[^"]*\\b' + sanitise(selector) + '\\b').test(string);
  }

  if (isClass(selector)) {
    return new RegExp('class="[^"]*\\b' + sanitise(selector) + '\\b').test(string);
  }

  throw new Error('unknown selector: ' + selector);

};
