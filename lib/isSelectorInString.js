'use strict';

var _ = require('lodash');
var escape = require('escape-regexp');
var test = require('./util').test;
var replace = require('./util').replace;

module.exports = function(selector, string){

  var isId = test(/^#/);
  var isClass = test(/^\./);
  var clean = replace(/^([#.])/, '');
  var sanitise = _.compose(escape, clean);

  if (isId(selector)) {
    return new RegExp('id="[^"]*' + sanitise(selector)).test(string);
  }

  if (isClass(selector)) {
    return new RegExp('class="[^"]*' + sanitise(selector)).test(string);
  }

  throw new Error('unknown selector: ' + selector);

};
