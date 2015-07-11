'use strict';

var _ = require('lodash');
var escape = require('escape-regexp');

module.exports = function(selector, string){

  var isId = function isId(selector) {
    return /^#/.test(selector);
  };

  var isClass = function isClass(selector) {
    return /^\./.test(selector);
  };

  var clean = function clean(selector) {
    return selector.replace(/^(?:#|.)/, '');
  };

  var sanitise = _.compose(escape, clean);

  if (isId(selector)) {
    return new RegExp('id="[^"]*' + sanitise(selector)).test(string);
  }

  if (isClass(selector)) {
    return new RegExp('class="[^"]*' + sanitise(selector)).test(string);
  }

  throw new Error('unknown selector: ' + selector);

};
