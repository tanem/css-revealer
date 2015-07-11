'use strict';

var fs = require('fs');
var _ = require('lodash');

exports.readFile = _.partial(fs.readFile, _, { encoding: 'utf-8' });

exports.split = _.curry(function(pattern, string){
  return string.split(pattern);
});

exports.head = _.curry(function(list){
  return list[0];
});

exports.test = _.curry(function(pattern, string){
  return pattern.test(string);
});

exports.concat = _.curry(function(listA, listB){
  return listA.concat(listB);
});

exports.prop = _.curry(function(key, object){
  return object[key];
});

exports.propEq = _.curry(function(key, value, object){
  return object[key] === value;
});

exports.replace = _.curry(function(pattern, substr, string){
  return string.replace(pattern, substr);
});
