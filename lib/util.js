'use strict';

var fs = require('fs');
var R = require('ramda');

exports.readFile = R.curry(fs.readFile)(R.__, { encoding: 'utf-8' });

exports.isFunction = function(obj){
  return Object.prototype.toString.call(obj) === '[object Function]';
};
